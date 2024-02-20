// db connection
const connection = require("../db/dbConfig.js");

async function register(req, res) {
  const { userName, firstName, lastName, email, password } = req.body;

  if (!email || !userName || !firstName || !lastName || !password) {
    return res
      .status(400)
      .json({ msg: "please provide all required information." });
  }

  try {
    await connection.query(
      "INSERT INTO users (userName,firstName,lastName,email,password) VALUES (?,?,?,?,?)",
      [userName, firstName, lastName, email, password]
    );
    return res.status(201).json({msg:"user Created"})
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "something went wrong, try again later!" });
  }
}

async function login(req, res) {
  res.send("login");
}

async function checkUser(req, res) {
  res.send("checkUser");
}

module.exports = { register, login, checkUser };
