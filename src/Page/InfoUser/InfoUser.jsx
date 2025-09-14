import "./InfoUser.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InfoUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (!id) { setErr("Không tìm thấy user_id trong localStorage"); return; }

    axios.get(`http://localhost:9080/users/${encodeURIComponent(id)}`)
      .then(res => {
        const u = res.data || {};
        setUser({
          email: u.email ?? "-",
          username: `${u.first_name ?? ""}${u.last_name ? " " + u.last_name : ""}`.trim() || "-",
          phone: (u.phone ?? "-").toString(),
        });
      })
      .catch(() => setErr("Không tải được thông tin người dùng"));

    axios.get(`http://localhost:9080/companies/by-user?user_id=${encodeURIComponent(id)}`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data?.items ?? []);
        setCompanies(data);
      })
      .catch(() => setCompanies([]));
  }, []);

  return (
    <div className="user-page">
      <h2>Thông tin người dùng</h2>
      <div className="user-info">
        {err && <p style={{ color: "red" }}>{err}</p>}
        {!user && !err && <p>Đang tải...</p>}
        {user && (
          <>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Số điện thoại:</strong> {user.phone}</p>
            <button className="edit-btn" onClick={() => navigate("/update-user", { state: { user } })}>
              Chỉnh sửa thông tin
            </button>
          </>
        )}
      </div>

      <div className="user-products">
        <h3>Công ty đã tạo</h3>
        <div className="product-grid">
          {companies.map((company) => (
            <div className="product-card-userinfo" key={company.id} onClick={() => navigate(`/list-product?company_id=${company.id}`)} style={{ cursor: "pointer" }}>
              <p>{company.name}</p>
            </div>
          ))}
          {!companies.length && <p>Chưa có công ty nào.</p>}
        </div>
      </div>
    </div>
  );
}

export default InfoUser;
