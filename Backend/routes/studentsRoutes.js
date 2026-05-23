const express = require("express");
const {
  createStudent,
  allStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentControllers");
const router = express.Router();

// creating student
router.post("/createStudent", createStudent);
// get all students
router.get("/allStudents", allStudents);
// get single student
router.get("/student/:id", getStudent);
// update student
router.put("/student/:id", updateStudent);
// delete student
router.delete("/student/:id", deleteStudent);

module.exports = router;
