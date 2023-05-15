const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const errorMiddleware = require("./middleware/error");

//CONFIG
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//MIDDLEWARE
app.use(cors());
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTE IMPORT
const student = require("./routes/studentRoute");
const teacher = require("./routes/teacherRoute");

app.use("/api", student);
app.use("/api", teacher);

// USE ON DEPLOYMENT
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//Middleware for ERROR
app.use(errorMiddleware);

module.exports = app;
