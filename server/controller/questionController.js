const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");

async function askQuestion(req, res) {
  const { title, description } = req.body;

  const questionid = crypto.randomUUID();

  const userid = req.user.user_id;

  console.log(userid + " ---user id");

  console.log(questionid + " ---question");

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields!" });
  }

  try {
    await dbConnection.query(
      `INSERT INTO questions (question_id, user_id, title, description) VALUES (?, ?, ?, ?)`,
      [questionid, userid, title, description]
    );

    return res.status(StatusCodes.CREATED).json({ msg: "Question posted" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

async function getQuestion(req, res) {
  try {
    const [questions] = await dbConnection.query(
      `SELECT questions.question_id,questions.id, questions.user_id, questions.title, questions.description FROM questions INNER JOIN Evangadi_db.users ON questions.user_id = Evangadi_db.users.user_id`
    );

    // Column 'userid' in field list is ambiguous

    if (questions.length === 0) {
      return res.json({ msg: "No questions posted" });
    }

    res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

module.exports = { askQuestion, getQuestion };
