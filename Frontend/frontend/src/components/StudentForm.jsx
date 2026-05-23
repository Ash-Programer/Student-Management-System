import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createStudent, updateStudent } from "../services/studentService";

function StudentForm({ fetchStudents, editStudent, setEditStudent }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  // SET DATA DURING EDIT
  useEffect(() => {
    if (editStudent) {
      setFormData({
        // Handle variations in field casing securely
        name:
          editStudent.name ||
          editStudent.MemberName ||
          editStudent.studentName ||
          "",
        email:
          editStudent.email ||
          editStudent.memberEmail ||
          editStudent.studentEmail ||
          "",
        age: editStudent.age || editStudent.Age || "",
      });
    }
  }, [editStudent]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // VALIDATION
      if (!formData.name.trim() || !formData.email.trim() || !formData.age) {
        Swal.fire({
          title: "Error",
          text: "All fields are required",
          icon: "error",
          confirmButtonColor: "#4caf50",
        });
        return;
      }

      // UPDATE STUDENT
      if (editStudent) {
        await updateStudent(editStudent.id || editStudent.Id, formData);

        Swal.fire({
          title: "Success",
          text: "Member Updated Successfully",
          icon: "success",
          confirmButtonColor: "#4caf50",
        });

        setEditStudent(null);
      } else {
        // CREATE STUDENT
        await createStudent(formData);

        Swal.fire({
          title: "Success",
          text: "Member Added Successfully",
          icon: "success",
          confirmButtonColor: "#4caf50",
        });
      }

      // RESET FORM
      setFormData({
        name: "",
        email: "",
        age: "",
      });

      // REFRESH STUDENT LIST & CLOSE MODAL
      fetchStudents();
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div className="border-0 bg-transparent">
      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <div className="mb-3">
          <label
            className="form-label small fw-bold text-secondary text-uppercase mb-1"
            style={{ letterSpacing: "0.5px" }}
          >
            Member Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control py-2"
            placeholder="e.g John de"
            value={formData.name}
            onChange={handleChange}
            style={{ borderRadius: "4px", borderColor: "#ced4da" }}
          />
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <label
            className="form-label small fw-bold text-secondary text-uppercase mb-1"
            style={{ letterSpacing: "0.5px" }}
          >
            Member Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control py-2"
            placeholder="e.g. qa+test@gmail.com"
            value={formData.email}
            onChange={handleChange}
            style={{ borderRadius: "4px", borderColor: "#ced4da" }}
          />
        </div>

        {/* AGE */}
        <div className="mb-4">
          <label
            className="form-label small fw-bold text-secondary text-uppercase mb-1"
            style={{ letterSpacing: "0.5px" }}
          >
            Age
          </label>
          <input
            type="number"
            name="age"
            className="form-control py-2"
            placeholder="e.g. 28"
            value={formData.age}
            onChange={handleChange}
            style={{ borderRadius: "4px", borderColor: "#ced4da" }}
          />
        </div>

        {/* ACTIONS */}
        <div className="pt-2">
          <button
            type="submit"
            className="btn text-white w-100 py-2 fw-medium"
            style={{
              backgroundColor: "#4caf50",
              borderColor: "#4caf50",
              borderRadius: "4px",
              fontSize: "15px",
            }}
          >
            {editStudent ? "Save Changes" : "Save Member"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
