import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault(); 
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }
    onLogin(email, password);
  };

  return (
    <div className="page-section" style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2 style={{ marginBottom: 12 }}>로그인</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ddd" }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 16px",
            border: 0,
            borderRadius: 10,
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(135deg,#ff385c,#ff6589)",
            cursor: "pointer"
          }}
        >
          로그인
        </button>
      </form>
    </div>
  );
}
