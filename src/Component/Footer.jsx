import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          {/* <img src="https://devops.vn/img/logo_devopsvn.png" alt="PYTHON Logo" className="footer-logo" /> */}
          <h4>TKN COMPANY</h4>
          <p><strong>PYTHON VietNam</strong></p>
          <p>Cộng đồng PYTHON VietNam - Kết nối,<br />hợp tác, chia sẻ.</p>
        </div>

        <div className="footer-column">
          <h4>Kết Nối</h4>
          <ul>
            <li>📣 Fanpage</li>
            <li>✉️ Email</li>
            <li>📢 Hỗ trợ</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Nổi Bật</h4>
          <ul>
            <li>📰 Blog</li>
            <li>📄 Cheat sheets</li>
            <li>📇 Flashcards</li>
            <li>📘 Ebooks</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Riêng Tư</h4>
          <ul>
            <li>📄 Điều khoản sử dụng</li>
            <li>📜 Chính sách bảo mật</li>
            <li><img src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png" alt="PYTHON" /></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 PYTHON VN - Cộng đồng PYTHON VietNam.
      </div>
    </footer>
  );
}

export default Footer;
