import React, { useEffect, useState } from "react";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reservations")) || [];
    setReservations(saved);
  }, []);

  const handleCancel = (idx) => {
    if (window.confirm("정말로 예약을 취소하시겠습니까?")) {
      const updated = reservations.filter((_, i) => i !== idx);
      setReservations(updated);
      localStorage.setItem("reservations", JSON.stringify(updated));
      alert("예약이 취소되었습니다.");
    }
  };

  if (reservations.length === 0) {
    return <p className="mypage-empty">예약 내역이 없습니다.</p>;
  }

  return (
    <div className="reservations-list">
      {reservations.map((res, idx) => (
        <div key={idx} className="reservation-card">
          <img src={res.home.image} alt={res.home.name} />
          <div className="reservation-info">
            <h3>{res.home.name}</h3>
            <p>{res.home.desc}</p>
            <p className="price">{res.home.price}</p>
            <p>예약자: {res.form.name}</p>
            <p>체크인: {res.form.date}</p>
            <p>숙박일수: {res.form.nights}박</p>
            <p>인원: {res.form.guests}명</p>
            {res.form.request && <p>요청사항: {res.form.request}</p>}

            {/* ✅ 예약 취소 버튼 */}
            <button
              className="cancel-btn"
              onClick={() => handleCancel(idx)}
            >
              예약 취소
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
