require("dotenv").config();
const express = require("express");
const app = express();
const port = 3333;

//  connection
const connection = require("./db/dbConfig");

////////////////////start//////////////////////////
// table routes middleware file
const tableRouter = require("./routes/createTableRoute");

// table routes middleware
app.use("", tableRouter);
/*******************end*************************/
/***********************************************/

// json middleware to extract json data
app.use(express.json());

// authentication middleware file
const authMiddleWare = require("./middleWare/authMiddleWare");

////////////////////start//////////////////////////
// user routes middleware file
const userRoutes = require("./routes/userRoute");

// user routes middleware
app.use("/api/users", userRoutes);

/*******************end*************************/
/***********************************************/

////////////////////start//////////////////////////

// questions routes middleware file
const questionRoutes = require("./routes/questionRoute");

// questions routes middleware
app.use("/api/questions", authMiddleWare, questionRoutes);

/*******************end*************************/
/***********************************************/

////////////////////start//////////////////////////
// answers routes middleware

// answer middleware
const answerRoutes = require("./routes/answerRoute");
//answer routes middleware
app.use("/api/answer", authMiddleWare, answerRoutes);

/*******************end*************************/
/***********************************************/

async function start() {
  try {
    const results = await connection.execute("select 'test'");
    // console.log(results)

    app.listen(port);
    console.log("database connected");
    console.log(`server connected on port http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
}

start();

//  (err) => {
//   if (err) console.log(err.message);
//   else `);
// });

// // testing Express server
// app.get("/", (req, res) => {
//   res.end("welcome");
// });
