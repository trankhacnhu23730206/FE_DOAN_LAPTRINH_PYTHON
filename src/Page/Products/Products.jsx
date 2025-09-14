// import { useNavigate } from "react-router-dom";
// import "./Products.css";
// import { useState, useEffect } from "react";
// import axios from "axios";

// function Products() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:9080/products/getAll");
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="product-total">
//       <div className="product-header">
//         <button className="product-btn active">Danh sách sản phẩm</button>
//         <button
//           className="product-btn"
//           onClick={() => navigate("/create-product")}
//         >
//           Đăng ký quảng cáo sản phẩm
//         </button>
//       </div>
//       <div className="product-grid">
//         {products.map((p) => (
//           <div key={p.id} className="product-card">
//             <h3 className="product-name">{p.name}</h3>
//             <ul>
//               <li>
//                 <strong>Nhà máy:</strong> {p.manufacturer}
//               </li>
//               <li>
//                 <strong>Giá thị trường:</strong> {p.price}
//               </li>

//               <li>
//                 <strong>Category:</strong> {p.category}
//               </li>
//               <li>
//                 <strong>Công ty:</strong> {p.company}
//               </li>
//               <li style={{ color: "red" }}>
//                 <strong>Lợi ích:</strong> {p.benefits}
//               </li>
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Products;



import { useNavigate, useSearchParams } from "react-router-dom";
import "./Products.css";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

function toVND(n) {
  if (n === null || n === undefined || n === "") return "-";
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  return num.toLocaleString("vi-VN") + " ₫";
}

function normalizeProduct(p) {
  return {
    id: p.id,
    name: p.name ?? "-",
    manufacturer: p.manufacturer ?? p.location ?? "-",           // 2 API khác field
    price: p.price ?? p.price_now ?? null,
    category: p.category ?? p.category_name ?? "-",
    company: p.company ?? p.company_name?.name_company ?? "-",
    phone: p.phone ?? p.company_name?.tele_phone ?? "-",
    benefits: p.benefits ?? p.note ?? "",
    createdAt: p.created_at ?? p.createdAt ?? null,
  };
}

export default function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("company_id"); // "2" | null

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const endpoint = useMemo(() => {
    if (companyId) return `http://localhost:9080/products/by-company/${companyId}`;
    return "http://localhost:9080/products/getAll";
  }, [companyId]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await axios.get(endpoint);
        const arr = Array.isArray(res.data) ? res.data : (res.data?.items ?? []);
        setProducts(arr.map(normalizeProduct));
      } catch (e) {
        console.error("Lỗi khi gọi API:", e);
        setProducts([]);
        setErr("Không tải được danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    })();
  }, [endpoint]);

  return (
    <div className="product-total">
      <div className="product-header">
        <button className="product-btn active">
          {companyId ? `Danh sách sản phẩm (Company ${companyId})` : "Danh sách sản phẩm"}
        </button>
        <button className="product-btn" onClick={() => navigate("/create-product")}>
          Đăng ký quảng cáo sản phẩm
        </button>
        {companyId && (
          <button className="product-btn" onClick={() => navigate("/list-product")}>
            Xem tất cả
          </button>
        )}
      </div>

      {loading ? (
        <div className="product-skeleton-row">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="product-card skeleton" />
          ))}
        </div>
      ) : (
        <>
          <div className="product-grid">
            {products.map((p) => (
              <div key={p.id} className="product-card">
                <div className="product-card__head">
                  <h3 className="product-name">{p.name}</h3>
                  <div className="pill-row">
                    <span className="pill">{p.category}</span>
                    <span className="pill pill--alt">{p.company}</span>
                  </div>
                </div>

                <ul className="product-card__meta">
                  <li>
                    <strong>Nhà máy:</strong> <span>{p.manufacturer}</span>
                  </li>
                  <li>
                    <strong>Giá thị trường:</strong> <span className="price">{toVND(p.price)}</span>
                  </li>
                  <li>
                    <strong>Điện thoại:</strong> <span>{p.phone}</span>
                  </li>
                  {p.createdAt && (
                    <li>
                      <strong>Tạo lúc:</strong>{" "}
                      <span>{new Date(p.createdAt).toLocaleString("vi-VN")}</span>
                    </li>
                  )}
                </ul>

                {p.benefits && (
                  <p className="product-note">
                    <strong>Lợi ích:</strong> {p.benefits}
                  </p>
                )}
              </div>
            ))}

            {!products.length && (
              <div className="product-empty">{err || "Không có sản phẩm phù hợp."}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
