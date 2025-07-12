import "./Company.css";
import { useState } from "react";

function Company() {
  const allCompanies = [...Array(152).keys()]; // ví dụ 152 sản phẩm
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(50);

  const totalPages = Math.ceil(allCompanies.length / perPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1); // reset về trang đầu
  };

  const displayedCompanies = allCompanies.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const companies = Array.from({ length: 152 }, (_, i) => ({
    name: `Công Ty ${i + 1}`,
    location: "Hà Nội",
    type: i % 3 === 0 ? "Food" : i % 3 === 1 ? "Education" : "Medicine",
    phone: `090${100000 + i}`,
  }));

  return (
    <div className="company-total">
      <div className="company-header">
        <button className="company-btn active">Danh sách công ty</button>
        <button className="company-btn">Đăng ký công ty</button>
      </div>

      {/* <div className="column-company">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="box">
            COMPANY
          </div>
        ))}
      </div> */}

      <div className="column-company">
        {companies
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map((company, i) => (
            <div key={i} className="company-box">
              <h3 className="company-name">{company.name}</h3>
              <p>
                <strong>Vị trí:</strong> {company.location}
              </p>
              <p>
                <strong>Loại hình:</strong> {company.type}
              </p>
              <p>
                <strong>Điện thoại:</strong> {company.phone}
              </p>
            </div>
          ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active-page" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default Company;
