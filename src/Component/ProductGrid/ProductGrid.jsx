import "./ProductGrid.css";

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
        <a href="/" className="grid-box-link">
          {linkText}
        </a>
      )}
    </div>
  );
};

function ProductGrid() {
  return (
    <div className="product-grid-container">
      {/* Phần banner phía trên (tùy chọn, mô phỏng từ ảnh) */}
      <div className="banner-section">
        <h2 className="banner-title">TRẦN KHẮC NHU PHÂN PHỐI SẢN PHẨM</h2>
        {/* <p className="banner-subtitle">alexa</p> */}
        <img
          src="https://lh3.googleusercontent.com/proxy/aAUxwffDmZGAXi4KjBtcGYTGQ0W9FIafRTfYWVzX8HhptgU2buqsjWwEmZxJ8COTYrhFSDrCjN-GP-moRCG1ByhIVP9SKwhdWVX_Adni2QbKRYKRkvEkk0l3RKHEmo0"
          //  src="https://pl acehold.co/600x200/B0E0E6/000000?text=Amazon+Devices"
          alt="Amazon Devices"
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
          linkText="See more"
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
          linkText="Shop now"
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
          linkText="Shop now"
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
          linkText="See more"
        />
      </div>
    </div>
  );
}

export default ProductGrid;
