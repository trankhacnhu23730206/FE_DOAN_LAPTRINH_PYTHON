import { Link } from "react-router-dom";
import "./CompanyGrid.css";
import { useEffect, useState } from "react";
import axios from "axios";

const PALETTE = ["#2563eb","#059669","#f59e0b","#7c3aed","#ef4444","#0ea5e9","#10b981","#a855f7","#f97316","#e11d48"];
const CATS_KEY = "CACHED_CATEGORIES_V1";       // khóa cache
const LIMIT   = 10;                              // chỉ cần 10 category

function CompanyGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    // 1) Thử lấy từ sessionStorage trước
    const cached = sessionStorage.getItem(CATS_KEY);
    if (cached) {
      setCategories(JSON.parse(cached));
      setLoading(false);
      return;
    }

    // 2) Không có cache -> gọi API 1 lần, rồi lưu cache
    (async () => {
      try {
        setErr("");
        const res = await axios.get("http://localhost:9080/categories/getall");
        const data = Array.isArray(res.data) ? res.data : [];
        const top10 = data
          .sort((a, b) => a.name.localeCompare(b.name))
          .slice(0, LIMIT);

        setCategories(top10);
        sessionStorage.setItem(CATS_KEY, JSON.stringify(top10));
      } catch (e) {
        console.error(e);
        setErr("Không tải được danh mục. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="product-grid-container">
      <div className="banner-section">
        <img
          src="https://img.lovepik.com/photo/60241/2876.jpg_wh860.jpg"
          alt="Banner"
          className="banner-image"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/1200x300/E0E0E0/333333?text=Banner";
          }}
        />
      </div>

      <div className="cat-grid">
        {loading && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="cat-tile skeleton" />
        ))}

        {!loading && err && <div className="cat-empty">{err}</div>}

        {!loading && !err && categories.map((cat, idx) => (
          <Link
            key={cat.id}
            to={`/list-company?category_id=${cat.id}`}
            className="cat-tile"
            style={{ "--tile-color": PALETTE[idx % PALETTE.length] }}
          >
            <span className="cat-name">{cat.name}</span>
            <span className="cat-cta">Xem công ty →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CompanyGrid;
