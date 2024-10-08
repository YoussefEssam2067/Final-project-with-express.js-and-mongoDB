require("dotenv").config();
const express = require("express");
const cors = require("cors"); //to api could be run in any frontend page
const path = require("path");
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText.js");

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log("Mongodb server started");
});

app.use(cors());
app.use(express.json()); // use it for parsing req.body

// CRUD (Create / Read / Update / Delete)

// '/api/courses' is route & (req, res) => {res.send(courses);} is handler (controller)

// use all routes by middleware
const courseRouter = require("./routes/courses.route.js");
const userRouter = require("./routes/users.route.js");

app.use("/api/courses", courseRouter); //localhost / => /api/courses
app.use("/api/users", userRouter);

// global middleware for not found router
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "this recourse is not available",
  });
});

// global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Example app listening on port 5000");
});
