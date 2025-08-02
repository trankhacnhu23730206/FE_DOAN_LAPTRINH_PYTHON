import React, { useState } from "react";
import "./CreateCompany.css";
import axiosPrivate from "../../Utils/PrivateCallApi";
import { useNavigate } from "react-router-dom";

const CreateCompanyPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("co chay vo create company ko");

    e.preventDefault();

    let dataToSend = {
      name: formData.name,
      email_company: formData.email,
      phone: formData.phone,
      is_register: 0,
      category_id: formData.category,
      user_id: localStorage.getItem("user_id")
    };

    try {
      const response = await axiosPrivate.post(
        "http://localhost:9080/companies/create",
        dataToSend
      );
      console.log("Tạo công ty thành công:", response.data);

      // ✅ Reset form nếu gửi thành công
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
      });
      navigate("/list-company")
      alert("Tạo công ty thành công!");
    } catch (error) {
      console.error(
        "Lỗi khi tạo công ty:",
        error.response?.data || error.message
      );
      alert("Lỗi khi tạo công ty");
    }
  };

  return (
    <div className="create-company-container">
      <h2>Tạo Công Ty Mới</h2>
      <form onSubmit={handleSubmit} className="company-form">
        <label>
          Tên công ty:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email công ty:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Số điện thoại:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Tạo công ty</button>
      </form>
    </div>
  );
};

export default CreateCompanyPage;
