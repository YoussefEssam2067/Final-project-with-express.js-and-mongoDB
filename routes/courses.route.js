const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const courseController = require("../controllers/courses.controller.js");
const { validationSchema } = require("../middlewares/validationSchema.js");
const verifyToken = require("../middlewares/verifyToken.js");
const userRoles = require("../utils/userRoles.js");
const allowedTo = require("../middlewares/allowedTo.js");

// route('/') means  the route is the root of the application with all method applied on it

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(
    verifyToken,
    allowedTo(userRoles.MANGER),
    validationSchema(),
    courseController.addCourse
  );

router
  .route("/:courseId")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANGER),
    courseController.deleteCourse
  );

module.exports = router;
