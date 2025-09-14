import { useNavigate, useSearchParams } from "react-router-dom";
import "./Company.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Company() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id"); // "2" | null

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setErr("");
      try {
        const url = categoryId
          ? `http://localhost:9080/companies/category?category_id=${categoryId}`
          : `http://localhost:9080/companies/getall`;

        const res = await axios.get(url);
        const data = Array.isArray(res.data) ? res.data : res.data?.items ?? [];
        setCompanies(data);
        setCurrentPage(1);
      } catch (e) {
        console.error(e);
        setCompanies([]);
        setErr("Không tải được dữ liệu. Kiểm tra endpoint hoặc CORS.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, [categoryId]);

  const totalPages = Math.max(1, Math.ceil(companies.length / perPage));
  const handlePageChange = (p) =>
    p >= 1 && p <= totalPages && setCurrentPage(p);
  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const displayed = companies.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="company-total">
      <div className="company-header">
        <button className="company-btn active">
          {categoryId ? `Danh sách công ty theo Category` : "Danh sách công ty"}
        </button>
        <button
          className="company-btn"
          onClick={() => navigate("/create-company")}
        >
          Đăng ký quảng cáo công ty
        </button>
        {categoryId && (
          <button className="company-btn" onClick={() => navigate("/list-company")}>
            Xem tất cả
          </button>
        )}
        <select
          value={perPage}
          onChange={handlePerPageChange}
          style={{ marginLeft: 8 }}
        >
          <option value={5}>5 / trang</option>
          <option value={10}>10 / trang</option>
          <option value={20}>20 / trang</option>
        </select>
      </div>

      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <>
          <div className="column-company">
            {displayed.map((company, i) => (
              <div
                key={company.id ?? i}
                className="company-box"
                onClick={() => navigate(`/list-product?company_id=${company.id}`)}
                style={{ cursor: "pointer" }}
              >
                <h3 className="company-name">{company.name}</h3>
                <p>
                  <strong>Vị trí:</strong> {company.location ?? "-"}
                </p>
                <p>
                  <strong>Loại hình:</strong> {company.type ?? "-"}
                </p>
                <p>
                  <strong>Điện thoại:</strong> {company.phone ?? "-"}
                </p>
              </div>
            ))}
            {!displayed.length && (
              <div>{err || "Không có công ty phù hợp."}</div>
            )}
          </div>

          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ◀
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={currentPage === idx + 1 ? "active-page" : ""}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Company;
