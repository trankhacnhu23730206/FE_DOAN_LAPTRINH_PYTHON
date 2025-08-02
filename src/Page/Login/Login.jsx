import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Đăng nhập:", formData);

    try {
      const response = await axios.post(
        "http://localhost:9080/auth/token",
        formData
      );
      console.log("Đăng nhập thành công:", response.data);
      navigate("/");

      // ✅ Lưu token vào localStorage
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    localStorage.setItem("user_id", response.data.user_id);

    } catch (error) {
      console.error(
        "Lỗi khi đăng nhap:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="login-form-container">
      <h2>Đăng nhập</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;
