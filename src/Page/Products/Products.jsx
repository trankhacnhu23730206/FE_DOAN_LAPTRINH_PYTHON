import { useNavigate } from "react-router-dom";
import "./Products.css";
import { useState } from "react";

function Products() {
  const navigate = useNavigate();

  const [products] = useState(
    Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `Sản phẩm ${i + 1}`,
      manufacturer: `Nhà máy ${i + 1}`,
      price: `${(Math.random() * 1000000 + 10000).toFixed(0)}₫`,
      benefits: `Lợi ích sản phẩm ${
        i + 1
      } giúp cải thiện sức khỏe và hiệu suất.`,
      category: i % 2 === 0 ? "Food" : "Education",
      company: `Công ty ${i + 1}`,
    }))
  );

  return (
    <div className="product-total">
      <div className="product-header">
        <button className="product-btn active">Danh sách sản phẩm</button>
        <button
          className="product-btn"
          onClick={() => navigate("/create-product")}
        >
          Đăng ký quảng cáo sản phẩm
        </button>
      </div>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <h3 className="product-name">{p.name}</h3>
            <ul>
              <li>
                <strong>Nhà máy:</strong> {p.manufacturer}
              </li>
              <li>
                <strong>Giá thị trường:</strong> {p.price}
              </li>

              <li>
                <strong>Category:</strong> {p.category}
              </li>
              <li>
                <strong>Công ty:</strong> {p.company}
              </li>
              <li style={{ color: 'red' }}>
                <strong>Lợi ích:</strong> {p.benefits}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
