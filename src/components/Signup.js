import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ★ 추가
import "../css/Signup.css";

function Signup() {
  const navigate = useNavigate(); // ★ 추가

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birth: "",
    marketing: false,
    terms: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.terms) {
      alert("이용약관 및 개인정보 처리방침에 동의해 주세요.");
      return;
    }

    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.birth) {
      alert("필수 정보를 모두 입력해 주세요.");
      return;
    }

    alert("회원가입이 완료되었습니다.");

    navigate("/login"); // ★ 가입 성공 → 로그인 페이지로 이동
  };

  const isDisabled = !form.firstName || !form.lastName || !form.email || !form.password || !form.birth || !form.terms;

  return (
    <main className="signup-page">
      <section className="signup-card">
        <div className="signup-header">
          <div className="signup-logo">airbnb</div>
          <h1 className="signup-title">계정 만들기</h1>
          <p className="signup-sub">아래 정보를 입력해 주세요.</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-row signup-row--double">
            <div className="field">
              <label htmlFor="lastName">성</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Kim"
              />
            </div>

            <div className="field">
              <label htmlFor="firstName">이름</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Chulsoo"
              />
            </div>
          </div>

          <div className="signup-row">
            <div className="field">
              <label htmlFor="email">이메일 주소</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력해 주세요."
              />
              <p className="field-help">예약 안내 및 주요 알림이 이메일로 발송됩니다.</p>
            </div>
          </div>

          <div className="signup-row">
            <div className="field">
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력해 주세요."
                minLength={6}
              />
              <p className="field-help">6자 이상 입력해 주세요.</p>
            </div>
          </div>

          <div className="signup-row">
            <div className="field">
              <label htmlFor="birth">생년월일</label>
              <input id="birth" name="birth" type="date" value={form.birth} onChange={handleChange} />
              <p className="field-help">실제 생년월일을 입력해 주세요.</p>
            </div>
          </div>

          <div className="signup-row signup-row--checkbox">
            <label className="checkbox">
              <input type="checkbox" name="marketing" checked={form.marketing} onChange={handleChange} />
              <span>프로모션 이메일 수신에 동의합니다.</span>
            </label>

            <label className="checkbox checkbox--required">
              <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
              <span>이용약관과 개인정보 처리방침에 동의합니다.</span>
            </label>
          </div>

          <div className="signup-row">
            <button type="submit" className="signup-btn" disabled={isDisabled}>
              가입하기
            </button>
          </div>

          <p className="signup-footer">
            이미 계정이 있으신가요?{" "}
            <button type="button" className="inline-link" onClick={() => navigate("/login")}>
              로그인하기
            </button>
          </p>
        </form>
      </section>

      <aside className="signup-side">
        <h2 className="signup-side-title">
          에어비앤비와 함께<br></br>여행을 시작해 보세요
        </h2>
        <p className="signup-side-desc">전 세계 숙소와 체험을 예약할 수 있습니다.</p>
        <ul className="signup-side-list">
          <li>안전한 결제 시스템</li>
          <li>전 세계 호스트와 연결</li>
          <li>맞춤형 추천 제공</li>
        </ul>
      </aside>
    </main>
  );
}

export default Signup;
