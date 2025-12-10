import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Confirm.css";

export default function Confirm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const home = state?.home;
  const form = state?.form;

  if (!home || !form) {
    return (
      <div className="confirm-page">
        <p>예약 정보가 없습니다.</p>
        <button onClick={() => navigate("/")}>홈으로</button>
      </div>
    );
  }

  return (
    <div className="confirm-page">
      <h2>예약이 완료되었습니다!</h2>

      <div className="confirm-box">
        <div className="home-info">
          <img src={home.image} alt={home.name} />
          <div>
            <h3>{home.name}</h3>
            <p>{home.desc}</p>
            <p className="price">{home.price}</p>
          </div>
        </div>

        <div className="user-info">
          <p><strong>예약자:</strong> {form.name}</p>
          <p><strong>체크인 날짜:</strong> {form.date}</p>
          <p><strong>숙박일수:</strong> {form.nights}박</p>
          <p><strong>인원:</strong> {form.guests}명</p>
          {form.request && <p><strong>요청사항:</strong> {form.request}</p>}
        </div>
      </div>

      <button className="home-btn" onClick={() => navigate("/")}>
        홈으로 돌아가기
      </button>
    </div>
  );
}
