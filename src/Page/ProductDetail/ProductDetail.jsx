import "./ProductDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function toVND(n) {
  if (n === null || n === undefined || n === "") return "-";
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  return num.toLocaleString("vi-VN") + " ₫";
}

// Chuẩn hóa cho đồng bộ nhiều API khác field
function normalizeProduct(p) {
  return {
    id: p.id,
    name: p.name ?? "-",
    image: p.image ?? p.thumbnail ?? null,
    manufacturer: p.manufacturer ?? p.location ?? "-",
    price: p.price ?? p.price_now ?? null,
    category: p.category ?? p.category_name ?? "-",
    company: p.company ?? p.company_name?.name_company ?? "-",
    phone: p.phone ?? p.company_name?.tele_phone ?? "-",
    address: p.address ?? p.company_name?.address ?? "",
    benefits: p.benefits ?? p.note ?? "",
    usage: p.usage ?? p.use ?? "", // công dụng (nếu backend có)
    specification: p.specification ?? p.specs ?? "", // thông số / mô tả
    createdAt: p.created_at ?? p.createdAt ?? null,
    updatedAt: p.updated_at ?? p.updatedAt ?? null,
  };
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  // Hỗ trợ nhiều khả năng endpoint tên khác nhau
  const endpoints = useMemo(
    () => [
      `http://localhost:9080/products/${id}`,
      `http://localhost:9080/products/detail/${id}`,
      `http://localhost:9080/products/get/${id}`,
    ],
    [id]
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      try {
        let product = null;

        // thử lần lượt các endpoint
        for (const ep of endpoints) {
          try {
            const res = await axios.get(ep);
            const raw = Array.isArray(res.data)
              ? res.data[0]
              : res.data?.data ?? res.data;
            if (raw) {
              product = normalizeProduct(raw);
              break;
            }
          } catch (_) {
            // thử endpoint tiếp theo
          }
        }

        if (!product) {
          // fallback: lấy all rồi find
          const all = await axios.get("http://localhost:9080/products/getAll");
          const arr = Array.isArray(all.data)
            ? all.data
            : all.data?.items ?? [];
          product = normalizeProduct(
            arr.find((x) => String(x.id) === String(id)) || {}
          );
        }

        if (!product?.id) throw new Error("Không tìm thấy sản phẩm.");
        setData(product);
      } catch (e) {
        console.error(e);
        setErr("Không tải được chi tiết sản phẩm.");
      } finally {
        setLoading(false);
      }
    })();
  }, [endpoints, id]);

  if (loading) {
    return (
      <div className="pd-wrap">
        <div className="pd-skeleton">
          <div className="spinner">
            <div className="dot" />
          </div>
          <p>Đang tải chi tiết sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (err || !data) {
    return (
      <div className="pd-wrap">
        <div className="pd-error">{err || "Không có dữ liệu."}</div>
        <button className="pd-btn" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="pd-wrap">
      <div className="pd-header">
        <button className="pd-btn" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
        <h1 className="pd-title">Thông tin chi tiết</h1>
        <div className="pd-tags">
          <span className="pill">{data.category}</span>
          <span className="pill pill--alt">{data.company}</span>
        </div>
      </div>

      <div className="pd-body">
        {data.image ? (
          //   <img className="pd-image" src={data.image} alt={data.name} />
          <div className="pd-image pd-image--placeholder">Company</div>
        ) : (
          <div className="pd-image pd-image--placeholder">{data.name}</div>
        )}

        <div className="pd-meta">
          <ul>
            <li>
              <strong>Giá:</strong>{" "}
              <span className="price">{toVND(data.price)}</span>
            </li>
            <li>
              <strong>Nhà máy:</strong> {data.manufacturer}
            </li>
            <li>
              <strong>Điện thoại:</strong> {data.phone}
            </li>
            {data.address && (
              <li>
                <strong>Địa chỉ:</strong> {data.address}
              </li>
            )}
            {data.createdAt && (
              <li>
                <strong>Tạo lúc:</strong>{" "}
                {new Date(data.createdAt).toLocaleString("vi-VN")}
              </li>
            )}
            {data.updatedAt && (
              <li>
                <strong>Cập nhật:</strong>{" "}
                {new Date(data.updatedAt).toLocaleString("vi-VN")}
              </li>
            )}
          </ul>

          {data.benefits && (
            <section className="pd-section">
              <h3>Lợi ích</h3>
              <p>{data.benefits}</p>
            </section>
          )}

          {data.usage && (
            <section className="pd-section">
              <h3>Công dụng / Cách dùng</h3>
              <p>{data.usage}</p>
            </section>
          )}

          {data.specification && (
            <section className="pd-section">
              <h3>Mô tả / Thông số</h3>
              <p>{data.specification}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
