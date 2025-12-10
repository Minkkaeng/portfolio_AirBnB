import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Reserve.css";

function fmt(d) {
  // YYYY-MM-DD
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
}
function addDays(baseISO, days) {
  const d = new Date(baseISO);
  d.setDate(d.getDate() + days);
  return fmt(d);
}
function diffDays(startISO, endISO) {
  const s = new Date(startISO);
  const e = new Date(endISO);
  const ms = e - s;
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export default function Reserve() {
  const { state: home } = useLocation();
  const navigate = useNavigate();

  const today = fmt(new Date());
  const tomorrow = addDays(today, 1);

  const [form, setForm] = useState({
    name: "",
    checkIn: today,
    checkOut: tomorrow,
    nights: 1,      // 자동 계산용
    guests: 1,
    request: "",
    // 하위 호환: 예전 MyReservations에서 읽던 필드
    date: today,
  });

  const updateNights = (checkIn, checkOut) => {
    const nights = diffDays(checkIn, checkOut);
    setForm(prev => ({ ...prev, nights }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 날짜 입력 처리
    if (name === "checkIn") {
      // checkOut이 checkIn보다 앞서면 checkOut을 최소한 checkIn+1로 보정
      const newCheckIn = value;
      const minOut = addDays(newCheckIn, 1);
      const newCheckOut =
        new Date(form.checkOut) <= new Date(newCheckIn) ? minOut : form.checkOut;

      setForm(prev => ({
        ...prev,
        checkIn: newCheckIn,
        checkOut: newCheckOut,
        date: newCheckIn, // 하위 호환
      }));
      updateNights(newCheckIn, newCheckOut);
      return;
    }
    if (name === "checkOut") {
      // 사용자가 장난치면 최소 checkIn+1로 스냅
      const newCheckOut =
        new Date(value) <= new Date(form.checkIn)
          ? addDays(form.checkIn, 1)
          : value;

      setForm(prev => ({ ...prev, checkOut: newCheckOut }));
      updateNights(form.checkIn, newCheckOut);
      return;
    }

    // 일반 입력
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prev = JSON.parse(localStorage.getItem("reservations")) || [];
    const entry = { home, form, createdAt: Date.now() };
    localStorage.setItem("reservations", JSON.stringify([ ...prev, entry ]));
    alert(`${home?.name || "숙소"} 예약이 완료되었습니다!`);
    navigate("/mypage?tab=reservations", { replace: true });
  };

  return (
    <div className="reserve-page">
      <h2>숙소 예약</h2>

      {home ? (
        <div className="reserve-info">
          <img src={home.image} alt={home.name} />
          <div>
            <h3>{home.name}</h3>
            <p>{home.desc}</p>
            <p className="price">{home.price}</p>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center", marginBottom: 20 }}>
          예약할 숙소 정보가 없습니다.
        </p>
      )}

      <form className="reserve-form" onSubmit={handleSubmit}>
        {/* 이름 + 날짜 범위 */}
        <div className="inline inline-top">
          <input
            type="text"
            name="name"
            placeholder="예약자 이름"
            value={form.name}
            onChange={handleChange}
            required
          />
          <div className="dates-row">
            <input
              type="date"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
              min={today}
              aria-label="체크인"
              required
            />
            <span className="tilde">~</span>
            <input
              type="date"
              name="checkOut"
              value={form.checkOut}
              onChange={handleChange}
              min={addDays(form.checkIn, 1)}
              aria-label="체크아웃"
              required
            />
          </div>
        </div>

        {/* 자동 계산된 숙박일수 표시 */}
        <div className="inline readonly-row">
          <label>숙박일수</label>
          <div className="nights-pill">{form.nights}박</div>
        </div>

        {/* 인원수 */}
        <div className="inline">
          <label>인원수</label>
          <input
            type="number"
            name="guests"
            value={form.guests}
            onChange={handleChange}
            min="1"
          />
        </div>

        <textarea
          name="request"
          placeholder="요청사항 (선택)"
          value={form.request}
          onChange={handleChange}
        />

        <button type="submit">예약 완료</button>
      </form>
    </div>
  );
}
