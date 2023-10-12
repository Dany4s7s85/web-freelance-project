import mongodb, { MongoClient } from "mongodb";
import fs from "fs";
import flatten from "flat";
import path from "path";
import { utf8ToString } from "./../utils/decoderUtils.js";

export default class Database {
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
  }

  connectDB() {
    return new Promise((resolve, reject) => {
      console.log("Requesting DB ...");

      this.client = MongoClient.connect(this.url, (err, foundDB) => {
        if (err) reject(err);
        else {
          this.db = foundDB.db(this.dbName);
          this.gridfs = new mongodb.GridFSBucket(this.db);
          console.log("DB Connection successfull;");
          resolve();
        }
      });
    });
  }

  getDataFromDB(collectionName) {
    return new Promise((resolve, reject) => {
      console.log("Getting Data from '" + collectionName + "' ...");
      this.db
        .collection(collectionName)
        .find()
        .toArray(function (err, result) {
          if (err) reject(err);
          else {
            console.log("Data found");
            resolve(result);
          }
        });
    });
  }

  write(collectionName, data) {
    return new Promise((resolve, reject) => {
      console.log("Writing data in " + collectionName + "...");
      this.db.collection(collectionName).insertOne(data, function (err, res) {
        if (err) reject(err);

        console.log("Writing successfull!");
        resolve(data._id.toString());
      });
    });
  }

  update(collection, targetID, jsonData) {
    return new Promise((resolve, reject) => {
      let flattendJson = flatten(jsonData);
      console.log("updating data in " + collection + "...");
      this.db
        .collection(collection)
        .updateOne({ _id: mongodb.ObjectId(targetID) }, { $set: flattendJson })
        .then((result) => {
          if (!result.acknowledged) return reject(result);

          console.log(result);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  bulkDelete(collection, ids) {
    return new Promise((resolve, reject) => {
      console.log("deleting data in " + collection + "...");
      const objectIds = [];
      ids.forEach((element) => {
        objectIds.push(mongodb.ObjectId(element));
      });

      console.log(JSON.stringify(objectIds, ids));
      this.db
        .collection(collection)
        .deleteMany({ _id: { $in: objectIds } })
        .then((result) => {
          console.log(JSON.stringify(result));
          if (!result.acknowledged) return reject(result);

          console.log(result);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  createDirectoryOnDisk(path) {
    if (!fs.existsSync(path)) {
      console.log("Creating file folder;");
      fs.mkdirSync(path, { recursive: true });
    }
  }

  writeFileOnDisk(path, data) {
    this.createDirectoryOnDisk(path);
    fs.writeFile(path, data, function (err) {
      if (err) return err;

      console.log("File saved in: " + path);
    });
  }

  async getDataFromDBPOST(
    collectionName,
    { pageSize, pageIndex, filter, sort }
  ) {
    let query = {};
    let canPreviousPage = false;
    let canNextPage = false;

    if (filter && filter.column && filter.value.length !== 0) {
      query = {
        [`${filter.column}`]: { $in: filter.value },
      };
    }

    const result = await this.db
      .collection(collectionName)
      .find(query)
      .skip(pageSize * pageIndex)
      .limit(pageSize)
      .toArray();
    const total = await this.db.collection(collectionName).find(query).count();
    const pageCount = Math.ceil(total / pageSize);
    return { result, pageCount, total };
  }

  async getDataFromDBDistinct(collectionName, { column, value }) {
    // const result = await this.db.collection(collectionName).distinct(column);
    let query = {};
    if (column && value) {
      query = {
        [`${column}`]: {
          $regex: value.toString(),
          $options: "i",
        },
      };

      if (column == "building.zipCode" || column == "building.buildingID") {
        query = { $where: `/^${value}.*/.test(this.${column})` };
      }
      const result = await this.db
        .collection(collectionName)
        .distinct(column, query);
      return result;
    } else {
      const result = await this.db.collection(collectionName).distinct(column);
      return result;
    }
  }

  getDownloadStream(id, res) {
    return new Promise((resolve, reject) => {
      var isIDValid = mongodb.ObjectId.isValid(id);
      if (!isIDValid) throw new Error("Invalid File ID");

      let downloadStream = this.gridfs.openDownloadStream(
        new mongodb.ObjectId(id)
      );

      downloadStream.on("data", (chunk) => {
        res.write(chunk);
      });

      downloadStream.on("error", function (error) {
        reject(error);
      });

      downloadStream.on("end", function () {
        console.log("GridFS Download Done");
        resolve();
      });
    });
  }

  async copyFileToFolder(fileID, tempFolder, addIdToName = true) {
    return new Promise((resolve, reject) => {
      var isIDValid = mongodb.ObjectId.isValid(fileID);
      if (!isIDValid) return reject("Invalid File ID");

      var gridFS = this.gridfs;
      this.db
        .collection("fs.files")
        .findOne({ _id: new mongodb.ObjectId(fileID) })
        .catch((err) => reject(err))
        .then((doc) => {
          let isError =
            doc === undefined ||
            doc === null ||
            doc.filename === undefined ||
            doc.filename === null;
          if (isError) throw reject(fileID);

          let fileName = utf8ToString(doc.filename);
          let downloadStream = gridFS.openDownloadStream(
            new mongodb.ObjectId(fileID)
          );
          const pathToFile = tempFolder + "/" + fileName;
          const extensionPosition =
            pathToFile.length - path.extname(fileName).length;
          let pathToFileWithID = pathToFile;
          if (addIdToName)
            pathToFileWithID =
              pathToFile.slice(0, extensionPosition) +
              "_" +
              fileID +
              pathToFile.slice(extensionPosition);
          downloadStream.pipe(fs.createWriteStream(pathToFileWithID));
          downloadStream.on("end", () => resolve());
          downloadStream.on("error", () => reject());
        });
    });
  }

  async copyProjectFilesToFolder(collectionName, fileID, tempFolder) {
    return new Promise((resolve, reject) => {
      var isIDValid = mongodb.ObjectId.isValid(fileID);
      if (!isIDValid) reject("Invalid Building ID");

      this.db
        .collection(collectionName)
        .findOne({ _id: new mongodb.ObjectId(fileID) })
        .catch((err) => {
          Promise.reject(err);
        })
        .then(async (doc) => {
          try {
            if (doc === null) {
              console.log("doc is null");
              return Promise.reject("Invalid Building ID");
            }

            console.log(doc);
            await this.copyProjectToFolder(doc.files, tempFolder).catch(
              (err) => {
                throw new Error(err);
              }
            );

            return Promise.resolve();
          } catch (error) {
            return Promise.reject(error);
          }
        })
        .catch((error) => {
          reject(error);
        })
        .then((result) => resolve());
    });
  }

  async copyProjectToFolder(files, folder) {
    await this.copyFileToFolder(files.dataJSON_id, folder, false).catch(
      (err) => {
        throw new Error(err);
      }
    );
    await this.copyFileToFolder(files.infoJSON_id, folder, false).catch(
      (err) => {
        throw new Error(err);
      }
    );
    await this.copyFileToFolder(files.thumbnail_id, folder, false).catch(
      (err) => {
        throw new Error(err);
      }
    );
    for (let i = 0; files["screenshot" + i] !== undefined; i++)
      await this.copyFileToFolder(files["screenshot" + i], folder, false).catch(
        (err) => {
          throw new Error(err);
        }
      );
    for (let i = 0; files["picture" + i] !== undefined; i++)
      await this.copyFileToFolder(files["picture" + i], folder, false).catch(
        (err) => {
          throw new Error(err);
        }
      );
  }

  uploadFileToDatabase(filePath, fileName) {
    return new Promise((resolve, reject) => {
      let uploadstream = this.gridfs.openUploadStream(fileName);

      uploadstream.on("error", function (error) {
        reject(error);
      });

      uploadstream.on("finish", function () {
        console.log("GridFS Upload Done");
        resolve(uploadstream.id);
      });

      fs.createReadStream(filePath).pipe(uploadstream);
    });
  }
}
