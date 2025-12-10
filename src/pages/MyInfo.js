import React, { useEffect, useState } from "react";
import "../css/MyPage.css";

const STORAGE_KEY = "myprofile";

export default function MyInfo() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    marketing: false,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) setProfile(saved);
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    alert("내 정보가 수정 및 저장되었습니다.");
  };

  const reset = () => {
    if (window.confirm("입력 내용을 초기화할까요?")) {
      setProfile({
        name: "",
        email: "",
        phone: "",
        address: "",
        marketing: false,
      });
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="myinfo-card">
      <div className="myinfo-header">
        <div className="avatar" aria-hidden />
        <div>
          <h3>{profile.name || "손님"}</h3>
          <p className="muted">{profile.email || "이메일 미등록"}</p>
        </div>
      </div>

      <form className="myinfo-form" onSubmit={onSubmit}>
        <div className="field">
          <label>이름</label>
          <input
            type="text"
            name="name"
            placeholder="홍길동"
            value={profile.name}
            onChange={onChange}
            required
          />
        </div>

        <div className="field">
          <label>이메일</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={profile.email}
            onChange={onChange}
            required
          />
        </div>

        <div className="field full-width">
          <label>주소</label>
          <input
            type="text"
            name="address"
            placeholder="예: 서울특별시 강남구 역삼동 123-45"
            value={profile.address}
            onChange={onChange}
          />
        </div>

        <div className="field">
          <label>전화번호</label>
          <input
            type="tel"
            name="phone"
            placeholder="010-1234-5678"
            value={profile.phone}
            onChange={onChange}
          />
        </div>

        <div className="checkbox-row">
          <input
            id="mk"
            type="checkbox"
            name="marketing"
            checked={profile.marketing}
            onChange={onChange}
          />
          <label htmlFor="mk">이벤트/혜택 안내 수신 동의</label>
        </div>

        <div className="actions-row">
          <button type="button" className="btn ghost" onClick={reset}>
            수정
          </button>
          <button type="submit" className="btn primary">
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
}
