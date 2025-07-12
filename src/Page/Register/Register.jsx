import "./Register.css";

import { useState } from "react";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // TODO: Gửi dữ liệu lên server hoặc xử lý validation
  };

  return (
    <div className="register-form-container">
      <h2>Đăng ký tài khoản</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Họ và Tên */}
        <div className="form-row double">
          <div className="form-group">
            <label>Họ:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Tên:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email và SĐT */}
        <div className="form-row double">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Số điện thoại:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Mật khẩu và Xác nhận */}
        <div className="form-row double">
          <div className="form-group">
            <label>Mật khẩu:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Nhập lại mật khẩu:</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default Register;
