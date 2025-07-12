import './Products.css';


function Products() {
  return <div className="product-total">
    
     <div>Trang Tạo Sản Phẩm</div>
      <div className="column-company">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="box">
            COMPANY
          </div>
        ))}
      </div>
    </div>;
}

export default Products;
