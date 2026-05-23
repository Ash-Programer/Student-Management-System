const pool = require("../config/db");

// create students
const createStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Validation
    if (!name?.trim() || !email?.trim() || !age) {
      return res.status(400).json({
        message: "Name, Email and Age are required",
      });
    }

    const sql = `
            INSERT INTO students(name, email, age)
            VALUES($1, $2, $3)
            RETURNING *
            `;
    const result = await pool.query(sql, [name, email, age]);

    res.status(201).json({
      message: "Student created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// get all students with pagination
const allStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 5;

    const search = req.query.search || "";

    const offset = (page - 1) * limit;

    // SEARCH QUERY

    const students = await pool.query(
      `
      SELECT *
      FROM students
      WHERE name ILIKE $1
      OR email ILIKE $1
      ORDER BY id 
      LIMIT $2 OFFSET $3
      `,
      [`%${search}%`, limit, offset],
    );

    // TOTAL COUNT

    const total = await pool.query(
      `
      SELECT COUNT(*)
      FROM students
      WHERE name ILIKE $1
      OR email ILIKE $1
      `,
      [`%${search}%`],
    );

    res.status(200).json({
      data: students.rows,
      total: parseInt(total.rows[0].count),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// get single students by id
const getStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      `
            SELECT students.*, marks.subject, marks.marks
            FROM students
            LEFT JOIN marks
            ON students.id = marks.student_id
            WHERE students.id = $1
            `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//  update student
const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const { name, email, age } = req.body;

    const result = await pool.query(
      `
            UPDATE students
            SET name = $1,
                email = $2,
                age = $3
            WHERE id = $4
            RETURNING *
            `,
      [name, email, age, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// delete student
const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      `
            DELETE FROM students
            WHERE id = $1
            RETURNING *
            `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createStudent,
  allStudents,
  updateStudent,
  deleteStudent,
  getStudent,
};
