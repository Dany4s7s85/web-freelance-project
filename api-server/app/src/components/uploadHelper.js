import fs from 'fs';
import formidable from'formidable';

export async function processUploadRequest(req, database, filePath)
{
    return new Promise((resolve, reject) => 
    {
        var form = new formidable.IncomingForm({ 
            uploadDir: filePath,
            keepExtensions: true,
            multiples: true
        });

        form.parse(req, async function(err, fields, files)
        {
            if (err)
                reject(err);

            uploadFiles(database, files, filePath)
            .then(() =>
            {
                return resolve("Successfully uploaded;");
            })
            .catch((err) =>
            {
                return reject(err);
            })
        });
        
    });
}

async function uploadFiles(database, files, filePath)
{
    return new Promise(async (resolve, reject) => 
    {
        try
        {
            const data = JSON.parse(JSON.stringify({files}));
            var isDataValid = isUploadDataValid(data);
            if(!isDataValid)
                reject("Upload failed; Missing file data;")

            database.createDirectoryOnDisk(filePath);
            var documentJson = await UploadData(data, database);
            DeleteTempData(data);
            await database.write("Buildings", documentJson);
            //console.log(documentJson);

            resolve();
        }
        catch (error)
        {
            reject(error);    
        }
    });
}

async function UploadData(data, database)
{
    var f0_id = await database.uploadFileToDatabase(data.files.floorplan_0.filepath, data.files.floorplan_0.originalFilename);
    var f1_id = await database.uploadFileToDatabase(data.files.floorplan_1.filepath, data.files.floorplan_1.originalFilename);
    var csv_id = await database.uploadFileToDatabase(data.files.csv.filepath, data.files.csv.originalFilename);
    var data_id = await database.uploadFileToDatabase(data.files.dataJson.filepath, data.files.dataJson.originalFilename);
    var info_id = await database.uploadFileToDatabase(data.files.infoJson.filepath, data.files.infoJson.originalFilename);
    var thumbnail_id = await database.uploadFileToDatabase(data.files.thumbnail.filepath, data.files.thumbnail.originalFilename);
    var screenshots_ids = await uploadFilesWithPrefix(database, data, "screenshot");
    var pictures_ids = await uploadFilesWithPrefix(database, data, "picture");
    
    //console.log("xx "+data.files.building.filepath);
    var documentJson = JSON.parse(fs.readFileSync(data.files.building.filepath, 'utf8'));
    var additionalInformationJson = JSON.parse(fs.readFileSync(data.files.info.filepath, 'utf8'));
    documentJson.files =
    {
        floorplan_0_id: f0_id,
        floorplan_1_id: f1_id,
        csv_id: csv_id,
        dataJSON_id: data_id,
        infoJSON_id: info_id,
        thumbnail_id: thumbnail_id
    };
    AddFileIDsToDocument(documentJson, screenshots_ids, "screenshot");
    AddFileIDsToDocument(documentJson, pictures_ids, "picture");
    documentJson.info =
    {
        bauleiter: additionalInformationJson.info.bauleiter,
        uploadDate: Date.now().toString()
    }

    console.log(documentJson)
    return documentJson;
}

async function uploadFilesWithPrefix(database, data, fileNamePrefix)
{
    let ids = [];
    let i = 0;
    console.log(data.files[fileNamePrefix + i]);
    while(data.files[fileNamePrefix + i] !== undefined)
    {
        var accessor = data.files[fileNamePrefix + i];
        console.log(accessor.filepath + " : " + accessor.originalFilename);
        var fileID = await database.uploadFileToDatabase(accessor.filepath, accessor.originalFilename);
        ids.push(fileID);
        i++;
    }

    return ids;
}

function isUploadDataValid(data)
{
    var isValid = data.files !== undefined;
    isValid = isValid && data.files.floorplan_0 !== undefined && data.files.floorplan_0.filepath !== undefined;
    isValid = isValid && data.files.floorplan_1 !== undefined && data.files.floorplan_1.filepath !== undefined;
    isValid = isValid && data.files.csv !== undefined && data.files.csv.filepath !== undefined;
    isValid = isValid && data.files.dataJson !== undefined && data.files.dataJson.filepath !== undefined;
    isValid = isValid && data.files.infoJson !== undefined && data.files.infoJson.filepath !== undefined;
    isValid = isValid && data.files.thumbnail !== undefined && data.files.thumbnail.filepath    !== undefined;

    return isValid;
}

function DeleteTempData(data)
{
    fs.unlink(data.files.floorplan_1.filepath, () => {});
    fs.unlink(data.files.floorplan_0.filepath, () => {});
    fs.unlink(data.files.csv.filepath, () => {});
    fs.unlink(data.files.dataJson.filepath, () => {});
    fs.unlink(data.files.infoJson.filepath, () => {});
    fs.unlink(data.files.thumbnail.filepath, () => {});

    deletTempFiles(data, "screenshot");
    deletTempFiles(data, "pictures");

    fs.unlink(data.files.building.filepath, () => {});
    fs.unlink(data.files.info.filepath, () => {});
}

function deletTempFiles(data, fileNamePrefix)
{
    let i = 0;
    while(data.files[fileNamePrefix + i] !== undefined)
    {
        var accessor = data.files[fileNamePrefix + i];
        fs.unlink(accessor, () => {});
        i++;
    }
}

function AddFileIDsToDocument(documentJson, ids, jsonPrefix)
{
    for (let i = 0; i < ids.length; i++)
        documentJson.files[jsonPrefix + i] = ids[i];    
}