const express = require("express");
const router = express.Router();

//questions controllers
const {
  askQuestion,
  getQuestion,
} = require("../controller/questionController");

router.get("/", getQuestion);

router.post("/askQuestion", askQuestion);

module.exports = router;
