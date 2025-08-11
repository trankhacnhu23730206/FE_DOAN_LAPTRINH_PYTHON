import "./App.css";
import Footer from "./Component/Footer/Footer";

import CompanyGrid from "./Component/ComapanyGrid/CompanyGrid";

import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import InfoUser from "./Page/InfoUser/InfoUser";
import Register from "./Page/Register/Register";
import Login from "./Page/Login/Login";
import Products from "./Page/Products/Products";
import Company from "./Page/Company/Company";
import UpdateUser from "./Page/UpdateUser/UpdateUser";
import CreateCompanyPage from "./Page/CreateCompany/CreateCompany";
import CreateProductPage from "./Page/CreateProduct/CreateProduct";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="app">
        <header className="header">
          <Link to="/" className="logo">
            TRANG CHỦ
          </Link>
          <div className="search-box">
            <input type="search" placeholder="Tìm sản phẩm..." />
          </div>
          <div className="login">
            <Link className="header-link" to="/list-product">
              SẢN PHẨM
            </Link>

            <Link className="header-link" to="/list-company">
              CÔNG TY
            </Link>

            <Link className="header-link" to="/register-user">
              ĐĂNG KÝ
            </Link>

            <Link className="header-link" to="/info-user">
              USER
            </Link>

            <Link className="header-link" to="/login-user">
              ĐĂNG NHẬP
            </Link>

            <Link className="header-link" to="/">
              ĐĂNG XUẤT
            </Link>
          </div>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<CompanyGrid />} />
            <Route path="/list-product" element={<Products />} />
            <Route path="/list-company" element={<Company />} />
            <Route path="/info-user" element={<InfoUser />} />
            <Route path="/register-user" element={<Register />} />
            <Route path="/login-user" element={<Login />} />
            <Route path="/update-user" element={<UpdateUser />} />

            <Route path="/create-company" element={<CreateCompanyPage />} />
            <Route path="/create-product" element={<CreateProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
