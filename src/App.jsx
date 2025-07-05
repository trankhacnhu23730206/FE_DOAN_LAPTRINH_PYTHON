import './App.css';
import Footer from './Component/Footer';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductGrid from './Component/ProductGrid/ProductGrid';

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">TRẦN KHẮC NHU LOGO</div>
        <div className="login">ĐĂNG KÝ</div>
      </header>
      <ProductGrid />
  
      <div className="column-company-wrap">
        <div className="column-company">
          {[...Array(100)].map((_, i) => (
              <div key={i} className="box" >COMPANY</div>
          ))}
        </div>
      </div>
      
      <Footer/>
    </div>
  );
}

export default App;
