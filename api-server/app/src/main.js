import "dotenv/config";
import express from "express";
import Database from "./components/database/database.js";
import {
    getDistinctData,
    getDataFromDatabase,
    getDataFromDatabasePOST,
    getDownloadStreamFromDatabase,
    getZipFileWithDataFromDatabase,
    getProjectFromDatabase
} from './components/getRequestHelper.js';
import {
    handleUpdateRequest,
    handleDeleteRequest,
    handlePOSTRequest
} from './components/postRequestHelper.js';
import fs from 'fs';

const server = express();
const port = process.env.PORT;
const dbName = process.env.DB_COLLECTION_NAME;
const url = process.env.DB_URL;
const database = new Database(url, dbName);
const filePath = process.env.LOCAL_TEMP_UPLOAD_PATH;

////////////////////      MIDDLEWARE       ////////////////////////

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  // Pass to next layer of middleware
  next();
});

////////////////////      POST       ////////////////////////

server.post("/post", (req, res) => {
  //console.log(JSON.stringify(req.body));
  handlePOSTRequest(req, database, filePath)
  .then(() => sendResponse(res, 200))
  .catch((err) => sendResponse(res, 400, err));
});

server.post("/stairlication/update", (req, res) => {
  //console.log(req.body);
  handleUpdateRequest(req, database)
  .then(() => sendResponse(res, 200))
  .catch((err) => sendResponse(res, 400, err));
});

server.delete("/stairlication/delete", (req, res) => {
  handleDeleteRequest(req, database)
  .then(() => sendResponse(res, 200))
  .catch((err) => sendResponse(res, 400, err));
});

function sendResponse(res, status, err)
{
  var resText = status === 200 ? "Successfully inserted;" : "Error while inserting data: ";
  res.status(status);
  var errText = err === undefined ? "" : err;
  res.send(resText + errText);
  console.log(status + " " + resText + errText);
}

////////////////////      GET       ////////////////////////

server.get("/", (req, res) => {
  res.send("The server is online;");
});

server.get("/stairlication", async (req, res) => {
  const responseData = await getDataFromDatabase(database, "Buildings");
  res.send(responseData);
});

server.get('/stairlication/download/', async (req, res) =>
{
    getZipFileWithDataFromDatabase(req.query, database)
    .then((zip) => sendZip(res, zip))
    .catch ((err) =>
    {
      console.log(err);
      res.status(400).send(":( No ID Found");
    });
});

server.get('/stairlication/download/*', async (req, res) =>
{
    try
    {
        const a = await getDownloadStreamFromDatabase(req, res, database);
        console.log("Sending Data successfull");
        res.status(200).send();
    }
    catch (err)
    {
        console.log(err);
        res.status(400).send(":( No ID Found");
    }
});

server.get('/stairlication/project/*', async (req, res) =>
{
    try
    {
        getProjectFromDatabase(req, database)
        .then((zip) => sendZip(res, zip))
        .catch((err) => res.status(400).send("Error: :( ID not found"));
    }
    catch (err)
    {
        res.status(400).send("Error: :( ID not found");
    }
});

function sendZip(res, zip)
{
    const data = zip.zipFile.toBuffer();
    res.set('Content-Type','application/octet-stream');
    res.set('Content-Length',data.length);
    res.status(200).send(data);
    fs.unlink(zip.zipFilePath, () => {});
    fs.rmSync(zip.originalDirectory, { recursive: true, force: true });
    console.log("Sending Data successfull");
}

server.post("/stairlication", async (req, res) =>
{
  const { body } = req;
  const responseData = await getDataFromDatabasePOST(database,"Buildings",body);
  res.send(responseData);
});

server.post("/distinct", async (req, res) =>
{
  const { body } = req;
  const responseData = await getDistinctData(database, "Buildings", body);
  res.send(responseData);
});


//Always last
server.listen(port, (req, res) => {
  console.log("Post server listens to port " + port);
});
