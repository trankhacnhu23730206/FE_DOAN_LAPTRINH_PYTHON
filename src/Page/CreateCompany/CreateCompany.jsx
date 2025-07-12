import React, { useState } from 'react';
import './CreateCompany.css';

const CreateCompanyPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '', phone: '', category: '' });
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
