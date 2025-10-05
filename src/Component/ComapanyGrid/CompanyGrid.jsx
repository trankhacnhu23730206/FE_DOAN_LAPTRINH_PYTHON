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
         <img
          src="data:image/jpeg;base64,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
          "
          alt="Banner"
          className="banner-image"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/1200x300/E0E0E0/333333?text=Banner";
          }}
        />
         <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNYZoIEGhSmwaTwzGwZUE20Fd5w4Mln31cFA&s
          "
          alt="Banner"
          className="banner-image"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/1200x300/E0E0E0/333333?text=Banner";
          }}
        />
         <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR0AAACxCAMAAADOHZloAAABO1BMVEWYz5WHxHM4dSlFhzUAmVuJxnVAgzCb0pcAQCLq9ehenk6e1Zqe0pgAm1w8ck1Oljp0qXgASy2Bt4ImXz4ASCtVlUSCv24AlVaQyoWKxnpJizl7uGhvrV0vbh2Ry4hBgTEAhlAAeEeQzZMAcUOAwWoYWzkAUDAroWRIgVh+wof0/fIAgExelmlqqVkAYjpooGAjawrf79tXkE1/tno3gCN+snuArn4AZz0Aj1VuvIEtaUUAOyCDxotCeVJUsXWKwYZ2rXB2smxLhT+CvHrT5c9trlnE4byr1Z6mwaGSt4v4+PhBqm5eqHI0h1dpnm8wl2B0toAAUCUoZTm70LcCYQApeg1vmGa12queu5lYiU3E2MB1vFxboEfN5sd+o3aLt4mgup7j5uPC0MGmvaUALAB2lnS1vrUAQRpghF6qsLECAAAPpElEQVR4nO2cC1vaShrHQQkJJrGQpqQVqYpcNAoIRdSqRNG2Xs7S07UXdXtstduz+/0/wc7kOpmZgMiAsuT/PD3HYoHJj3fe27whEgkVKlSoUKFChQoVKlSoUKFChQoVKlSoUKFChQoVKlSopy7JMB57CU9WUu58e0V87FU8TUm5ViymFfnHXsdTFGCjxQAdIdxapHiTTUze3lVC48GVK5lwYvLabjKkg0uOWZK3hNB2MEklB46mhn4H147mmo5aCCO6X1LMgbOoquvhxvJrT3PhpNTcY6/miUlqOfFKTQnr4cbySzq3Mp0KsJzZEA4mSMdkkxJmQ6eDSzq32ACPHFoOIb5lshFWIiEcUnxSAHazkgvZ0MQrQmrFgGx4SZJCz+MXoPNchC2M1Z1WqxQWoX6ZdKS9kqaBvGcxpOOXSccuteRiWKL7BenkrN6XvPx8wn0zdL227AcAHZgQynJsa9I7g3zyY8nW+U4EAgJ0CrK2vbi2pe5Oej7IJ5edRmBM01oRK6ILpgqbEw4nEjFUlw7gE1uVIJ23+yvrSUWc7G0FxRe3EDwxbVWCMUsUeT5kA+isC0sonljOygZDWUqpPjylkA4iUHWqlW0Qv2VLsT9IOhO8ycR1UJRXlrY1W4uqQ8dMgnKg4JrktEfsCGpKVdWUI4uOtNc6L8kw0Gv7k7zVROWtgMAx6UirJc05nFibaDoRXlTWZwu2ipAOf665flouTPqpFs+LjsyYVULgLE56uYXI7GAglhPTUuGIkytIZwexHK0oTPrGititjIhFp4Rsq5RamHg40j/kUum8tSpBOkXZSQ4XK2pKMCaejrhvbiZN3pOc/s7SciUF8qBwvgnsp05Ftot0RYAHoXZ2KDwPLQdqd0k2+ciQTsoEJAhvk2PYyKCseNCL4Du7W5rpaz6C7VSE/a+OkhvLBtifOadHbkmScjuDDviJ67tCZWt5aXFNfW5mhWPa/+KVJU1uWT1yICmy2ippg5/LicqssCsIoCId6/4Or8BmpxZrWX9rgR9j8tLgp5a8GFGU5PqKOtZ0IoYgWz1y+BerIpJTTAIv2E3iuPcGxaJ9zFKSJKsikpeEh8Jxn8dbvowfdzogvlitYG1nVTOPdNcefDAnbsXsnqBcauWk/wM6EfGtAFvBcqxknulqW8KDayHxueY/7vPogEjoiN3SR6K3glpYXgRkYovLBVUo5B5MZwU9z9LknENHWj13f7HdGa/gzncKMPhWKvBUt7D+8NSEV3YX0QMb2TrPggM83mNb4zbGw4tGZ6Wopor7HWOgjJYvqNvEeZaEdHiARe2O29aKQEDirJAcNNmH51k+6/noTTfZplMZTzcN6Qxs8+KKddznaFt9vofAkeWt3TFzO7aY0IERMAV8/NqipSUV6Q0COJUxaQ4ic1rWetnQMa3H7umYfZ2Ce28fyKSKY9L/8s1pwcSNFR3zuE/w6BS3ba0tA78vbI4DHGxO6xzw8eh4VvUgB8qLOVB+WtpXETNKqSllTFyyIcTQ4LIqOXSkvVbJcapLD7wY97xPERw6KVVQV8ZmAEN8XvHNae1YdOCRt/fooHdywjOJWVsryTG6lcStPh08OUjHuRnP8qNLg95xxluTcXZ7kM3CcRmrjrAm50Dii+qyL6/dF5LSuS+tFQbNTUZQo/PJNWdYSJPNxgD1X/X9ssqub05LrghN1HJisaIw8NJHQEf5hFa+LQSPFNlb3bH0Z994xI5vTitWUf9AU3545j3olY2kv+OrXbSS87C0eh5zjarS/yrEpOAPuGvu24DMjcWZ9yjoiPsqavBayVp1Do0u2w9ZhWjMCsiYlkdnEWZuxcFPLkdBB3iIYgzfXPweSkyurDzoUkRjfd+b03IxwZuAH94EQ1c+gp0FjKfo21w571sC7Nj74JEqb05rFjEjQRigCQZDhGE+3aXDi5EhnqEXVLWy6DUGgPH4enBrDI6NxNlU0VZhvzNY5mZks+2DnGif2AA0b+rZbHVYePhcAR5IV5YdoVmbLC+zKH29OgvUAYO9Gl/NTk0BQNWDg0//PDqotqfA36emhmY8fGQf9Z+7Oc+OYrAvwODmJ1Y1esSmA5U1Kdl/GR4d2BjYF1ypK0u2zKkhgcV31Q2Djk/tYZagwNyVpK23SJYCit8Oi7jAkE7kgEpn2FmzLRheHDxCkVFfgKXtGDQ6Q/PKmACdlXVLHYVn9JGwtJ0IhU72YGR04OGKLZYvyurFxDqFDqPX7v3mLD/mYbwo/4Y0nvqo+oJPnk6EbxOmM7Kv0xsDOrhfztZH1jZ9+nSIlKfN7JV7agzoAMfswzPC0YJxoAPwLLiKj3LIfTzozEy7ih+N7rBGEmd3kxLrkzO2Xpk/sKPWwvSCmSiP5KCPN44O58szMzPlwyMjwu78hnE2aLQdrzNt0ckOP1XmjcMZnw6PWObKzL4dWkQC1vTCtB3Thxu2JKNsQylD2T8fBT/hta2X91O1evSqH70OfOM2Eq6mp6bdn4fpm+dNMPPpKGcpnZm3+AS958toX+K4/v59IJ0pNJYvTC0suCnhmyHh4Y8giPk0h1wD+DkDTeiQDZ1+FUQHryEWPOMZEh4JOpxymvh4AR/4iy50uIHUPx2ywkK21pCqLbiHMtS1chz8HfVNIR1u5kUXzfXSNKa4LbiWl7T3xFJkUuyTZh4CSAd9kKb50N7UpPMijl8hAwXS4ak9U1TMu8s82FblLlbOpQGeQDpDgBNMh9oy9Yn5sRZwyOVuDsDEUybf1KUT7yrq5Xd/QhAditMh8bB1PTlgGV3hWJuLTHxcOuX5LsrMkHBeZPxKo8rEg+j03lfm3mJZc0GnE+hzXDzzlL3l0Il3DVwzNOOZSwc/IZgOEczpxsMyrBsgzemdp3Eg7cHf1KMT/DRuju614/QIadppEB3KIV92g2JNDB2zBPI9YqHSB3LNZFi/B50oGrPjjcY98HSxHdJMbs4uNoZpPAYl0cnXdGLpXHnmECvZe9Pxxft48/gEwTMdsJ0D6ZBeJ7vxVb/4vEHYDzPjgUkytsp8nqsl+JfRPLZowvP0pMOV0W3VaOrXXxpeDHvRJx0Rt5GNrxfHiUTi+OIUb8EzC1uk13lf0xMJXU/U/HUUR4StXnS4NAKnEW9e6LWTk9O682C8TE/Og+jguU77GKzTlI4bD6ucx8ADFrAb5z0l/6rn8a3Vkw4SyxsnCfNadF2vuw/2ZTu4T87CVwN/auAlCdfMhg6Pb6w8tNX3tcQ3YEEYHbC1/G/q0kn3NJ3GtW5eCzBJvYfxwKdR6WC75xK81OmVfv05+/Wa8MtsOj0g2fEvkQOX8O1fwCvn8zzeocAdTy86ntdpnIKXvT7Vj+unF3rVfXiuHzrYxtq4Bh/j5yv9eAM4Z4IOm63FlzG389Km84qybDym96LjRfMGtMgvVf34S7wx7T2MRnW3nxFAB49YJp2rNqRDEaN8GY/neegcJDqdMuaWSTq+ng26sWo2HTSi+7YWl/n+/R3XjQ42dpGF5pg40WufadUFo4EMgs43y3nyeX9AvxcdcInPvjtOHnpXz+2A17yu6rUvPjrTrs/j3j0D+s51odPGAGzYIevkipIvM4rpRI2Vf2/hqX3D8YCg5W8x43S4DLzEZzZuNNmJV3Urwrxo+AoLz/GYz3wGrSfI7xAENqwwqOvHX0nHw+b8hqxA86/eWwG9hu0ugs5rnI51id9JOiATtAP68amPj2tn3lMD6FA6OxtTl8fWUi9xPIzcMq1hms9bOU+t351lXeIz+5/7ivPGnJPw1Opxkk66Fx36qGD2s54wc4Ur/LdsZp2o7WRYZ/0F3tNfiwI6QTGLQ23nGUehA/g0klb6lnhB0HGemgmmQ5n2guajJzaAe9ZPhkKHiOhRWF4BOq9g8PK7Hg7vLhN03rnOA99ZlhKJOtgKuleLun7HMp53wV6ZQmcjm4V04J8EUamzsZ1DLBvM196/zoN8J/+BsJ00NRuc8ehYeN5RYta0VXsmEo04LBtdOl6eznGZTLRLRCfptBOXV9nPicTUCUyah7OzjrCuKXA5egJ8wKbn8W+szMw8pZJA6YDLS0c9c0BjVrMBBOjMwdDu0PGVEhznPe9etqPDStkKhTXil4xmLDHHk6+5hS9eo5fxM2OSTjSKXi6SFINU5+L0IJE4BZej/3ALLVoH7L50srq9UhDS24RDYkNHKuOF1oe/4AdS++sDnu8Qh1qvKXTQV/Lcspnv6HYhek26nd50yIievTq5his9PiHTHWbnNmBr+cukdB76nSglF8QPbXrRQbZWHfYZzM+5durC6a9GJ3vK2Y2Nz8d6m9ZaZjXNw1Oa7nlKnUU2v3rR8Z0ENuo/TkDGc1pHesv0vtB9KwlToJy4oj3OrDt4RDmwkT4Q4wbz5KxBTzppX9RqfKkh3Yvg3mAAnSqVws0plRq7e7VmZujL9C+ZMmnQiw6e8jSOfXSoXsemM0/SoaeDWfr5H7vbAo7ucaAFTySIN+xJBz9l981cdLM4Cp17HvXZzNgNEcLuaeDZmwuHMmZwDzpRYgbFhRN4nhVAh761AsSKDVS5x1kxPCemuLnedCCegLPQQHMNtJ3e8xeu6bCdwwicbXLhHFGGc310Aqe7qAM+c5ngc/QgOrSbskZgOtYYRqClR8sBk5UunUw0TcgbsKDMYMzNZ4KHNsrTdDr39jzsR5fhdGCUwscaHKSPnTp0hjC/Q6UTELYIOEO4GQkOx83jU7PAzOHQqUGfeXfpMFeA7YjUO62HvK9MISO5ViMB/r/rQO7o6dwPzxDgwK8zsG4DKMNRLOBIMubtEjPl4GNFi07Q5oHqOXMaNKwaNDfYE0+2PazbSRw+6I0SAZvKpRM1HXJgtHuwokETuW+muvEZ3leFQPHGoXODBLzLpvvn8DowB2AiKh2gakD1AA3HGP73GUQMoEjvu2uGTOdV0AojVZr9ZLP1YbPpS33RCdhBXe6xCbId+Am+qbazWfvbU6wf6gf3+DwnRKaFvzmoVuv1arV68CYkQ4h3v4yCDRpDUUZ2y//YSblRlKYSgV4XeTRn/5lwGTfQCJvGj4uLX5unP8AjSvOyeXmiGKcXE29Syk0T/s9o/rz9eXt3d5lMJi/P7s5+n/36enby2It7bClNfv/Tv0G+B+j8vru7+3l7e/bjx9XZ5c3Z378m3nRueHH203/gzvp5dnf76/by6vaXkry73ezc3t5MOh2jyfOd9fWbpmH8vLv679nd77u/rzp3d1cA0O+z5mMv77F1w8MvdYQYLsGeurz7eXZ7++vsFthRcvPi+P1jL++RpTRB0mT55c3NTcNQwH/NP2aIf+zVPbqMZnPiN1CoUKFChQo1lvoffNEx0zSWp5YAAAAASUVORK5CYII=
          "
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
