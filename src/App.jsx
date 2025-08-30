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
import PublicOnly from "./Routes/PublicOnly";
import RequireAuth from "./Routes/RequiredAuth";
import { clearToken, isAuthenticated } from "./Utils/auth";

function App() {

  const handleLogout = () => {
    clearToken();
    window.location.href = "/login-user"; 
  };

  return (
    <BrowserRouter basename="/FE_DOAN_LAPTRINH_PYTHON">
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

            {/* Nếu đã đăng nhập thì hiển thị User và Đăng xuất */}
            {isAuthenticated() ? (
              <>
                <Link className="header-link" to="/info-user">
                  USER
                </Link>
                <Link className="header-link" to="/" onClick={handleLogout}> 
                  ĐĂNG XUẤT
                </Link>
              </>
            ) : (
              <>
                {/* Nếu chưa đăng nhập thì hiển thị Đăng ký và Đăng nhập */}
                <Link className="header-link" to="/register-user">
                  ĐĂNG KÝ
                </Link>
                <Link className="header-link" to="/login-user">
                  ĐĂNG NHẬP
                </Link>
              </>
            )}
          </div>
        </header>

        <main className="main-content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<CompanyGrid />} />
            <Route path="/list-product" element={<Products />} />
            <Route path="/list-company" element={<Company />} />

            {/* Public-only (khách mới vào được) */}
            <Route element={<PublicOnly />}>
              <Route path="/register-user" element={<Register />} />
              <Route path="/login-user" element={<Login />} />
            </Route>

            {/* Private routes (phải có token) */}
            <Route element={<RequireAuth />}>
              <Route path="/info-user" element={<InfoUser />} />
              <Route path="/update-user" element={<UpdateUser />} />
              <Route path="/create-company" element={<CreateCompanyPage />} />
              <Route path="/create-product" element={<CreateProductPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
