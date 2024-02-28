// db connection
const connection = require("../db/dbConfig.js");

////////
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

///////////////////////////////////////////
// register Function
async function register(req, res) {
  const { userName, firstName, lastName, email, password } = req.body;

  if (!email || !userName || !firstName || !lastName || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information." });
  }

  try {
    const [user] = await connection.query(
      "SELECT userName,user_id FROM users WHERE userame = ? OR email = ?",
      [userName, email]
    );

    console.log(user.length);

    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already registered" });
    }

    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 characters" });
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);

    const hasdPassword = await bcrypt.hash(password, salt);

    await connection.query(
      "INSERT INTO users (userName,firstName,lastName,email,password) VALUES (?,?,?,?,?)",
      [userName, firstName, lastName, email, hasdPassword]
    );
    // console.log(salt);
    // console.log(hasdPassword);

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: `user Created: ${firstName} ${lastName}` });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}

////////////////////////////////////////////
// login Function
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter all required fields" });
  }

  try {
    const [user] = await connection.query(
      "SELECT userName,user_id,password FROM users WHERE email = ?",
      [email]
    );

    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalide credintial" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user[0].password);
    // console.log(isMatch);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }

    const { user_id, userName } = user[0];
    // const user_id = user[0].user_id;

    const token = jwt.sign({ userName, user_id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(StatusCodes.OK)
      .json({ msg: "user login successful1", token });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, please try again later!" });
  }
}

////////////////////////////////////////////
// checkUser Function
async function checkUser(req, res) {
  const userName = req.user.userName;
  const user_id = req.user.user_id;
  res.status(StatusCodes.OK).json({ msg: "valid user", userName, user_id });
}

module.exports = { register, login, checkUser };
