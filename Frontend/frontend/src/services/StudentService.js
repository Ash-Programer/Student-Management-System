import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// CREATE STUDENT
export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/createStudent`, studentData);

    return response.data;
  } catch (error) {
    console.log("Create Student Error:", error);

    throw error;
  }
};

// GET ALL STUDENTS WITH PAGINATION
export const getStudentss = async (page = 1, limit = 5) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/allStudents?page=${page}&limit=${limit}`,
    );

    return response.data;
  } catch (error) {
    console.log("Get Students Error:", error);

    throw error;
  }
};

export const getStudents = async (page, limit, search) => {
  const response = await axios.get(`${BASE_URL}/allStudents`, {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
};

// GET SINGLE STUDENT
export const getSingleStudent = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/student/${id}`);

    return response.data;
  } catch (error) {
    console.log("Get Single Student Error:", error);

    throw error;
  }
};

// UPDATE STUDENT
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${BASE_URL}/student/${id}`, studentData);

    return response.data;
  } catch (error) {
    console.log("Update Student Error:", error);

    throw error;
  }
};

// DELETE STUDENT
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/student/${id}`);

    return response.data;
  } catch (error) {
    console.log("Delete Student Error:", error);

    throw error;
  }
};
