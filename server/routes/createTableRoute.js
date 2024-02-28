// create tables
const express = require("express");
const tableRouter = express.Router();

const { createTable } = require("../controller/createTable");

tableRouter.get("/create", createTable);

module.exports = tableRouter;
