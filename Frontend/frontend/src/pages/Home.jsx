import { useEffect, useState } from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import Pagination from "../components/Pagination";
import { getStudents } from "../services/studentService";

function Home() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editStudent, setEditStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // NEW: State to store the debounced value used for the API call
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("QA");
  const [entriesLimit, setEntriesLimit] = useState(10);

  // STATE TO CONTROL MODAL VISIBILITY
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FETCH STUDENTS
  const fetchStudents = async () => {
    try {
      // Note: We pass debouncedSearchTerm here instead of the raw searchTerm
      const data = await getStudents(
        currentPage,
        entriesLimit,
        debouncedSearchTerm,
      );
      setStudents(data.data);
      setTotalPages(Math.ceil(data.total / entriesLimit));
    } catch (error) {
      console.log(error);
    }
  };

  // EFFECT 1: Handle Search Debouncing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to page 1 whenever search query changes
    }, 500); // Waits 500ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // EFFECT 2: Load Students when page, limits, or debounced term changes
  useEffect(() => {
    fetchStudents();
  }, [currentPage, entriesLimit, debouncedSearchTerm]);

  // Open modal for editing if editStudent state changes from the list
  useEffect(() => {
    if (editStudent) {
      setIsModalOpen(true);
    }
  }, [editStudent]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditStudent(null); // Reset edit state on close
  };

  return (
    <div
      className="py-4 px-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* POPUP MODAL OVERLAY */}
      {isModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editStudent ? "Edit Member" : "Add New Member"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <StudentForm
                  fetchStudents={() => {
                    fetchStudents();
                    handleCloseModal();
                  }}
                  editStudent={editStudent}
                  setEditStudent={setEditStudent}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL WIDTH DASHBOARD CONTAINER */}
      <div className="card shadow-sm border-0 bg-white p-4 w-100">
        {/* HEADER SECTION */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 text-dark m-0" style={{ fontWeight: "600" }}>
            All Members
          </h2>

          <button
            className="btn text-white px-4 py-2"
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: "#4caf50",
              borderColor: "#4caf50",
              fontWeight: "500",
            }}
          >
            Add New Member
          </button>
        </div>

        {/* SEARCH / FILTER INPUT */}
        <div className="row mb-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: "4px", borderColor: "#ced4da" }}
            />
          </div>
        </div>

        {/* STUDENT LIST (TABLE CONTAINER TAKING FULL WIDTH) */}
        <div className="table-responsive w-100">
          <StudentList
            students={students}
            fetchStudents={fetchStudents}
            setEditStudent={setEditStudent}
          />
        </div>

        {/* FOOTER SECTION: SHOW ENTRIES & PAGINATION */}
        <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top w-100">
          {/* SHOW ENTRIES DROPDOWN */}
          <div
            className="d-flex align-items-center text-secondary"
            style={{ fontSize: "14px" }}
          >
            <span>Show </span>
            <select
              className="form-select form-select-sm mx-2"
              style={{ width: "auto", display: "inline-block" }}
              value={entriesLimit}
              onChange={(e) => {
                setEntriesLimit(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
            <span> entries</span>
          </div>

          {/* PAGINATION COMPONENT */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
