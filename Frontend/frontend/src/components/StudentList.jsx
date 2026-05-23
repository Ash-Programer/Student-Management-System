import Swal from "sweetalert2";

import { deleteStudent } from "../services/studentService";

function StudentList({ students, fetchStudents, setEditStudent }) {
  // DELETE STUDENT

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this student",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        await deleteStudent(id);

        Swal.fire({
          title: "Deleted",
          text: "Student deleted successfully",
          icon: "success",
        });

        fetchStudents();
      } catch (error) {
        console.log(error);

        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="card p-4 shadow mt-4">
      <h3 className="mb-4 text-center">Students List</h3>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>

                <td>{student.name}</td>

                <td>{student.email}</td>

                <td>{student.age}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditStudent(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Students Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
