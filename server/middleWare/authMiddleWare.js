const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleWare(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }

  const token = authHeader.split(" ")[1];
  // console.log(authHeader);
  // console.log(token);

  try {
    // {userName,user_id}

    const { userName, user_id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userName, user_id };
    next();
    // console.log(data)
    // return res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
}

module.exports = authMiddleWare;
