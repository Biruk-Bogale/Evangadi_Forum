const express = require("express");
const app = express();
const port = 3333;
const connection = require("./db/dbConfig");

// db connection

////////////////////start//////////////////////////
// table routes middleware file
const tableRouter = require("./routes/createTableRoute");

// table routes middleware
app.use("", tableRouter);
/*******************end*************************/
/***********************************************/

// json middleware to extract json data
app.use(express.json());

////////////////////start//////////////////////////
// user routes middleware file
const userRoutes = require("./routes/userRoute");

// user routes middleware
app.use("/api/users", userRoutes);

/*******************end*************************/
/***********************************************/

////////////////////start//////////////////////////
// questions routes middleware

/*******************end*************************/
/***********************************************/

////////////////////start//////////////////////////
// answers routes middleware

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
