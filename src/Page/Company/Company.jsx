import { useNavigate } from "react-router-dom";
import "./Company.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Company() {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [companies, setCompanies] = useState([]);

   useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:9080/companies/getall");
        setCompanies(response.data); // assuming response.data is an array
      } catch (error) {
        console.error("Lỗi khi lấy danh sách công ty:", error);
      }
    };

    fetchCompanies();
  }, []);


  const totalPages = Math.ceil(companies.length / perPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1); // reset về trang đầu
  };

  const displayedCompanies = companies.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );


  return (
    <div className="company-total">
      <div className="company-header">
        <button className="company-btn active">Danh sách công ty</button>
        <button className="company-btn" onClick={()=> navigate("/create-company")} >Đăng ký quảng cáo công ty</button>
      </div>

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
