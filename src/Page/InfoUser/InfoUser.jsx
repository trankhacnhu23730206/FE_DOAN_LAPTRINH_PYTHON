import "./InfoUser.css";


import { useState } from "react";
import "./InfoUser.css";

function InfoUser() {
    
    const [user, setUser] = useState({
    email: "tran.khac.nhu@example.com",
    username: "trankhacnhu",
    phone: "0987654321",
  });

  const [products, setProducts] = useState([
    { id: 1, name: "Sản phẩm A", image: "https://placehold.co/120x100" },
    { id: 2, name: "Sản phẩm B", image: "https://placehold.co/120x100" },
    { id: 3, name: "Sản phẩm C", image: "https://placehold.co/120x100" },
  ]);

  return (
    <div className="user-page">
      <h2>Thông tin người dùng</h2>
      <div className="user-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Số điện thoại:</strong> {user.phone}</p>
        <button className="edit-btn">Chỉnh sửa thông tin</button>
      </div>

      <div className="user-products">
        <h3>Sản phẩm đã tạo</h3>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfoUser;

