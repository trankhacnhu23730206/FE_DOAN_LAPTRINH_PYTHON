import "./ProductGrid.css"

function ProductGrid() {
  return (
    <div className="column-company-wrap">
      <div className="column-company">
        {[...Array(32)].map((_, i) => (
          <div key={i} className="box">
            Product
          </div>
        ))}
      </div>
      <div>XEM THÊM</div>
    </div>
  );
}

export default ProductGrid;
