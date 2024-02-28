// db connection
const connection = require("../db/dbConfig");

function createTable(req, res) {
  // Users Table
  const Users = `CREATE TABLE if not exists Users(
    user_id INT(20) NOT NULL AUTO_INCREMENT,
    userName VARCHAR(20) NOT NULL,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (user_id)
    )`;

  // Questions Table
  const Questions = `CREATE TABLE if not exists Questions(
        id INT(20) NOT NULL AUTO_INCREMENT,
        question_id VARCHAR(100) NOT NULL UNIQUE,
        user_id INT(20) NOT NULL,
        title VARCHAR(50) NOT NULL,
        description VARCHAR(200) NOT NULL,
        tag VARCHAR(20),
        PRIMARY KEY (id,question_id),
        FOREIGN KEY(user_id) REFERENCES Users(user_id)
            )`;

  // Answers Table
  const Answers = `CREATE TABLE if not exists Answers(
    answer_id INT(20) NOT NULL AUTO_INCREMENT,
    user_id INT(20) NOT NULL,
    question_id VARCHAR(100) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY(answer_id),
    FOREIGN KEY(question_id) REFERENCES Questions(question_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)

  )`;

  //Create Table Query function
  function CreateTable(table) {
    connection.query(table, (err) => {
      if (err) console.log(err);
      else console.log("table created");
      res.end("table created");
    });
  }

  //   Table Creation
  CreateTable(Users);
  CreateTable(Questions);
  CreateTable(Answers);
}

module.exports = { createTable };
