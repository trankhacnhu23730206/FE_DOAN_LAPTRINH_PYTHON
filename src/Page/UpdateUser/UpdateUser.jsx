import { useState } from "react";
import "./UpdateUser.css";

function UpdateUser() {
  const [user, setUser] = useState({
    first_name: "Khắc",
    last_name: "Trần",
    phone: "0987654321",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thông tin đã được cập nhật!");
    // Gửi request cập nhật lên server tại đây nếu cần
  };

  return (
    <div className="update-user-page">
      <h2>Cập nhật thông tin người dùng</h2>
      <form className="update-user-form" onSubmit={handleSubmit}>
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
              required
            />
          </div>
        </div>

        <button type="submit" className="update-btn">Lưu thay đổi</button>
      </form>
    </div>
  );
}

export default UpdateUser;
