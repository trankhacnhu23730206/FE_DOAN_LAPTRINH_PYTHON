import React, { useState } from "react";
import "./CreateProduct.css";


const CreateProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    price: "",
    category: "",
    companyId: "",
    note: "",
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
    setFormData({
      name: "",
      manufacturer: "",
      price: "",
      category: "",
      companyId: "",
      note: "",
    });
  };

  return (
    <div className="create-product-container">
      <h2>Tạo Sản Phẩm Mới</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Tên sản phẩm:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Nhà máy sản xuất:
          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Giá sản phẩm (VND):
          <input
            type="number"
            name="price"
            value={formData.price}
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

          <label>
          Company:
          <input
            type="text"
            name="company"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Lợi ích và thành phẩn sản phẩm:
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows={3}
            placeholder="Thông tin thêm về sản phẩm..."
          />
        </label>

        <button type="submit">Tạo sản phẩm</button>
      </form>
    </div>
  );
};

export default CreateProductPage;
