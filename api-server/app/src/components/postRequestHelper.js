import { processUploadRequest } from "./uploadHelper.js";

export async function handleUpdateRequest(req, database) {
  return new Promise(async (resolve, reject) => {
    try {
      //console.log(req.body.building);
      await database.connectDB();
      const data = { building: req.body.building };
      await database.update("Buildings", req.body.id, data);

      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export async function handleDeleteRequest(req, database) {
  return new Promise(async (resolve, reject) => {
    try {
      await database.connectDB();
      await database.bulkDelete("Buildings", req.query.ids.split(";"));

      resolve();
    } catch (err) {
      reject("Error:" + err);
    }
  });
}

export async function handlePOSTRequest(req, database, filePath) {
  return new Promise(async (resolve, reject) => {
    try {
      await database.connectDB();
      database.createDirectoryOnDisk(filePath);
      await processUploadRequest(req, database, filePath);

      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
