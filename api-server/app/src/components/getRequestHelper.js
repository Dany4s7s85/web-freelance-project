import path from 'path';
import UUID from 'pure-uuid';
import {fileURLToPath} from 'url';
import AdmZip from 'adm-zip';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tempFolderPath = __dirname + './../../../../../temp/';

export async function getDataFromDatabase(database, collectionName, body) {
  try {
    const connectionResponse = await database.connectDB();
    const dataResponse = await database.getDataFromDB(collectionName, body);
    console.log("Sending Data successfull");
    return dataResponse;
  } catch (err) {
    console.log(err);
  }
}

export async function getDataFromDatabasePOST(database, collectionName, body) {
  try {
    await database.connectDB();
    const dataResponse = await database.getDataFromDBPOST(collectionName, body);
    console.log("Sending Data successfull");
    return dataResponse;
  } catch (err) {
    console.log(err);
  }
}

export async function getDistinctData(database, collectionName, body) {
  try {
    const connectionResponse = await database.connectDB();
    const dataResponse = await database.getDataFromDBDistinct(
      collectionName,
      body
    );
    console.log("Sending Data successfull");
    return dataResponse;
  } catch (err) {
    console.log(err);
  }
}

export async function getDownloadStreamFromDatabase(req, res, database)
{
    var idString = path.basename(req.url);
    //console.log(idString);
    const connectionResponse = await database.connectDB();
    //console.log(connectionResponse);
    const dataResponse = await database.getDownloadStream(idString, res);
    //console.log(dataResponse);
    return dataResponse;
}

export async function getZipFileWithDataFromDatabase(query, database)
{
  return new Promise(async (resolve, reject) =>
  {
    try
    {
      await database.connectDB();
      const paramsCount = Object.keys(query).length;

      var tempDataFolderPath = await createFolder(path.join(tempFolderPath, 'tempData/', new UUID(4).format()));
      for (let i = 0; i < paramsCount; i++)
      {
        const fileID = query[i];
        await database.copyFileToFolder(fileID, tempDataFolderPath);
      }
      var zip = await createZipFolder(tempDataFolderPath, tempFolderPath)
      resolve(zip);
    }
    catch(error)
    {
      reject(error);
    }
  });
}

export function sendDownloadStream(zipFolderPath, res)
{
    console.log('Download started => ' + zipFolderPath); 
    const downloadStream = fs.createWriteStream(zipFolderPath);
    res.pipe(downloadStream);
    downloadStream.on('finish',() => {
        downloadStream.close();
        console.log('Download Completed'); 
    });
}

export async function getProjectFromDatabase(req, database)
{
    return new Promise(async (resolve, reject) =>
    {
        var tempDataFolderPath = await createFolder(path.join(tempFolderPath, 'tempData/', new UUID(4).format()));
        try
        {
            await database.connectDB();

            const id = path.basename(req.url);
            await database.copyProjectFilesToFolder("Buildings", id, tempDataFolderPath);
            var zip = await createZipFolder(tempDataFolderPath, tempFolderPath);
            resolve(zip);
        }
        catch (error) {
          console.log("Error on projectDownload");
          fs.rmSync(tempDataFolderPath, { recursive: true, force: true });
          reject(error);
        }
    });
}

async function createFolder(path)
{
    return new Promise((resolve, reject) => 
    {
        fs.mkdir(path, {recursive: true}, (err) =>
        {
            if (err)
                reject(err);
            console.log(path);
            resolve(path);
        });
    });
}

async function createZipFolder(targetFolderPath, outputPath)
{
    await createFolder(outputPath);
    const zip = new AdmZip();
    const outputFilePath = targetFolderPath + ".zip";
    zip.addLocalFolder(targetFolderPath);
    zip.writeZip(outputFilePath);

    console.log(`Created ${outputFilePath} successfully`);

    return {
        zipFile: zip,
        zipFilePath: outputFilePath,
        originalDirectory: targetFolderPath
    };
}
