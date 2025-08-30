import { Link } from "react-router-dom";
import "./CompanyGrid.css";

// Component con cho mỗi ô sản phẩm
const GridBox = ({ title, imageUrl, items = [], linkText }) => {
  return (
    <div className="grid-box">
      <h3 className="grid-box-title">{title}</h3>
      <div className="grid-box-content">
        {imageUrl ? (
          // Nếu có ảnh chính
          <img
            src={imageUrl}
            alt={title}
            className="grid-box-main-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/400x300/E0E0E0/333333?text=Image+Not+Found";
            }}
          />
        ) : (
          // Nếu có nhiều item nhỏ
          <div className="grid-box-items-grid">
            {items.map((item, index) => (
              <div key={index} className="grid-box-item">
                <img
                  src={item.img}
                  alt={item.text}
                  className="grid-box-item-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/100x80/E0E0E0/333333?text=Item";
                  }}
                />
                <p className="grid-box-item-text">{item.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {linkText && (
        <Link to="/list-company" className="grid-box-link">
          {linkText}
        </Link>
      )}
    </div>
  );
};

function CompanyGrid() {
  return (
    <div className="product-grid-container">
      <div className="banner-section">
        <img
          src="https://img.lovepik.com/photo/60241/2876.jpg_wh860.jpg"
          F
          alt="Banner"
          className="banner-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x200/E0E0E0/333333?text=Banner+Image+Not+Found";
          }}
        />
      </div>

      {/* Phần lưới chính gồm 4 ô */}
      <div className="main-grid">
        <GridBox
          title="EDUCATION"
          items={[
            {
              img: "https://placehold.co/100x80/DDA0DD/000000?text=Women's+Fashion",
              text: "CƠM GÀ",
            },
            {
              img: "https://placehold.co/100x80/ADD8E6/000000?text=Men's+Fashion",
              text: "CƠM SƯỜN",
            },
            {
              img: "https://placehold.co/100x80/F0E68C/000000?text=Beauty+Products",
              text: "CƠM TẤM",
            },
            {
              img: "https://placehold.co/100x80/90EE90/000000?text=Home+Goods",
              text: "CƠM CANH",
            },
          ]}
          linkText="Xem thêm"
        />
        <GridBox
          title="FOOD"
          items={[
            {
              img: "https://placehold.co/100x80/DDA0DD/000000?text=Women's+Fashion",
              text: "CƠM GÀ",
            },
            {
              img: "https://placehold.co/100x80/ADD8E6/000000?text=Men's+Fashion",
              text: "CƠM SƯỜN",
            },
            {
              img: "https://placehold.co/100x80/F0E68C/000000?text=Beauty+Products",
              text: "CƠM TẤM",
            },
            {
              img: "https://placehold.co/100x80/90EE90/000000?text=Home+Goods",
              text: "CƠM CANH",
            },
          ]}
          linkText="Xem thêm"
        />
        <GridBox
          title="MEDICINE"
          items={[
            {
              img: "https://placehold.co/100x80/DDA0DD/000000?text=Women's+Fashion",
              text: "CƠM GÀ",
            },
            {
              img: "https://placehold.co/100x80/ADD8E6/000000?text=Men's+Fashion",
              text: "CƠM SƯỜN",
            },
            {
              img: "https://placehold.co/100x80/F0E68C/000000?text=Beauty+Products",
              text: "CƠM TẤM",
            },
            {
              img: "https://placehold.co/100x80/90EE90/000000?text=Home+Goods",
              text: "CƠM CANH",
            },
          ]}
          linkText="Xem thêm"
        />
        <GridBox
          title="MILK TEA"
          items={[
            {
              img: "https://placehold.co/100x80/DDA0DD/000000?text=Women's+Fashion",
              text: "CƠM GÀ",
            },
            {
              img: "https://placehold.co/100x80/ADD8E6/000000?text=Men's+Fashion",
              text: "CƠM SƯỜN",
            },
            {
              img: "https://placehold.co/100x80/F0E68C/000000?text=Beauty+Products",
              text: "CƠM TẤM",
            },
            {
              img: "https://placehold.co/100x80/90EE90/000000?text=Home+Goods",
              text: "CƠM CANH",
            },
          ]}
          linkText="Xem thêm"
        />
      </div>
      {/* <ProductGrid /> */}
    </div>
  );
}

export default CompanyGrid;
