import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const img = (file) => `${process.env.PUBLIC_URL}/img/${file}`;

const homes = [
  { id: 1, name: "오션뷰", desc: "해변 근처", price: "₩100,000", image: img("4e5b10d3-eaa3-4c2b-a9b2-27d3ce0a7750.webp"), category: "beach" },
  { id: 2, name: "제주 귤 별장", desc: "자연경 휴식", price: "₩120,000", image: img("f3a2e782-32b6-47d0-8f26-ca966b4fa818.avif"), category: "mountain" },
  { id: 3, name: "화이트", desc: "심플 깔끔", price: "₩90,000", image: img("ee938f37-312d-4220-8850-d424e96890a5.avif"), category: "city" },
  { id: 4, name: "푸른바다", desc: "바다 전망", price: "₩110,000", image: img("66ef1ece-c95a-453d-ab70-df6547c22521.avif"), category: "beach" },
  { id: 5, name: "시골 감성", desc: "전원생활", price: "₩80,000", image: img("1581e026-8632-41cb-b5cc-2cc8b9d3c0c8.avif"), category: "country" },
  { id: 6, name: "럭셔리", desc: "도심 편의", price: "₩150,000", image: img("2af6cb70-6458-4c36-9afd-1a110a044f91.avif"), category: "city" },
  { id: 7, name: "감성 별장", desc: "전원생활", price: "₩80,000", image: img("96a9371d-c969-4d51-b992-172ce251b6e3.avif"), category: "country" },
  { id: 8, name: "한강뷰", desc: "도심 편의", price: "₩150,000", image: img("ce23cf59-110a-4ea0-9232-86173d283ada.avif"), category: "city" }
];

export default function Homes({
  query = "",
  handleReserve = () => alert("로그인 후 이용가능합니다."),
  category,
  handleAddToCart = () => {}
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const search = (query || "").toLowerCase().trim();
  const filteredHomes = homes.filter((home) => {
    const matchQuery =
      !search ||
      (home.name && home.name.toLowerCase().includes(search)) ||
      (home.desc && home.desc.toLowerCase().includes(search));
    const matchCategory = category
      ? String(home.category).toLowerCase() === String(category).toLowerCase()
      : true;
    return matchQuery && matchCategory;
  });

  const handleCartClick = (home) => {
    handleAddToCart(home);
    if (window.confirm("장바구니에 담았습니다. 장바구니로 이동하시겠습니까?")) {
      navigate("/cart");
    }
  };

  // 상세 모달: background + item 함께 전달
  const openDetailModal = (home) => {
    navigate(`/detail/${home.id}`, { state: { background: location, item: home } });
  };

  return (
    <div className="homes-container page-section">
      {filteredHomes.length > 0 ? (
        filteredHomes.map((home) => (
          <div key={home.id} className="item">
            <div className="thumbWrap">
              <img src={home.image} alt={home.name} loading="lazy" />
            </div>
            <div className="meta">
              <h4>{home.name}</h4>
              <p>{home.desc}</p>
              <p>{home.price}</p>
            </div>
            <div className="row">
              <button type="button" onClick={() => openDetailModal(home)}>상세보기</button>
              <button type="button" onClick={() => handleReserve(home)}>예약</button>
              <button type="button" onClick={() => handleCartClick(home)}>장바구니</button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", width: "100%", marginTop: 20 }}>
          검색 결과가 없습니다.
        </p>
      )}
    </div>
  );
}
