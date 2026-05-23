const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");
const pool = require("./config/db");
const studentRouter = require("./routes/studentsRoutes");

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use("/api", studentRouter);

// Database Connection Check
async function testDBConnection() {
  let client;

  try {
    client = await pool.connect();

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed");

    console.log(error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

testDBConnection();

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
