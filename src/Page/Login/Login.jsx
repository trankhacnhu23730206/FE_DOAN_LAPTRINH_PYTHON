import "./Login.css";

// function Login() {
//   return (
//     <div className="login-total">
//       <div>ĐĂNG NHẬP USER</div>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đăng nhập:", formData);

    // TODO: Gửi request tới server ở đây

    // Chuyển hướng về trang chủ sau đăng nhập
    navigate("/");
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

        <button type="submit" className="submit-btn">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
