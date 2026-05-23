function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      {/* PREVIOUS BUTTON */}

      <button
        className="btn btn-primary me-2"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>

      {/* PAGE NUMBERS */}

      {pages.map((page) => (
        <button
          key={page}
          className={`btn me-2 ${
            currentPage === page ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      {/* NEXT BUTTON */}

      <button
        className="btn btn-primary"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
