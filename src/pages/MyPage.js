import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Cart from "./Cart";
import MyReservations from "./MyReservations";
import MyInfo from "./MyInfo";
import "../css/MyPage.css";

const VALID_TABS = ["info", "cart", "reservations"];

export default function MyPage({ cartItems, onRemove, onIncrease, onDecrease }) {
  const [searchParams] = useSearchParams();

  const initial = VALID_TABS.includes(searchParams.get("tab"))
    ? searchParams.get("tab")
    : "info";

  const [activeTab, setActiveTab] = useState(initial);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (VALID_TABS.includes(tab)) setActiveTab(tab);
  }, [searchParams]);

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>

      <div className="mypage-tabs">
        <button
          className={activeTab === "info" ? "active" : ""}
          onClick={() => setActiveTab("info")}
        >
          내 정보
        </button>
        <button
          className={activeTab === "cart" ? "active" : ""}
          onClick={() => setActiveTab("cart")}
        >
          장바구니
        </button>
        <button
          className={activeTab === "reservations" ? "active" : ""}
          onClick={() => setActiveTab("reservations")}
        >
          예약 확인
        </button>
      </div>

      <div className="mypage-content">
        {activeTab === "info" && <MyInfo />}
        {activeTab === "cart" && (
          <Cart
            cartItems={cartItems}
            onRemove={onRemove}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        )}
        {activeTab === "reservations" && <MyReservations />}
      </div>
    </div>
  );
}
