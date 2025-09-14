import { useState, useEffect } from "react";
import "./UpdateUser.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function UpdateUser() {
  const navigate = useNavigate();
  const { state } = useLocation(); // nhận user từ navigate(..., { state: { user } })

  const splitName = (u) => {
    if (u?.first_name || u?.last_name) return { first_name: u.first_name || "", last_name: u.last_name || "" };
    const parts = (u?.username || "").trim().split(/\s+/);
    return { first_name: parts.slice(-1)[0] || "", last_name: parts.slice(0, -1).join(" ") || "" };
  };

  const seed = state?.user || null;
  const nameSeed = splitName(seed);

  const [user, setUser] = useState({
    first_name: nameSeed.first_name,
    last_name: nameSeed.last_name,
    phone: (seed?.phone ?? "").toString(),
    password: "", // MẬT KHẨU MỚI (sẽ gửi kèm nếu không rỗng)
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (seed) return;
  }, [seed]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token") || localStorage.getItem("token");
      if (!token) {
        setErr("Thiếu token đăng nhập. Vui lòng đăng nhập lại.");
        setLoading(false);
        return;
      }

      // Gửi các field backend hỗ trợ; password chỉ thêm khi có nhập
      const payload = {
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        password: user.password.trim() === "" ? "" : user.password,
      };

      const res = await axios.put("http://localhost:9080/users/update", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data?.message || "Cập nhật thành công!");
      navigate("/info-user");
    } catch (error) {
      console.error(error);
      const msg =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Cập nhật thất bại. Vui lòng thử lại.";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-user-page">
      <h2>Cập nhật thông tin người dùng</h2>
      <form className="update-user-form" onSubmit={handleSubmit}>
        {err && <p style={{ color: "red", marginBottom: 8 }}>{err}</p>}

        <div className="form-row">
          <div className="form-group">
            <label>Họ:</label>
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Tên:</label>
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Số điện thoại:</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu mới:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu mới (tuỳ chọn)"
            />
          </div>
        </div>

        <button type="submit" className="update-btn" disabled={loading}>
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
