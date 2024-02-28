const express = require("express");
const router = express.Router();

const { postAnswer, all_answers } = require("../controller/answerController");

router.post("/:questionid/postAnswer", postAnswer);
router.get("/:questionid", all_answers);

module.exports = router;
