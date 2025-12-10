import React, { useState } from "react";
import '../css/Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h2>고객 문의</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="문의 내용을 입력하세요."
          value={form.message}
          onChange={handleChange}
          required
        />
        <p>고객센터 : 031-111-1111</p>
        <p>이메일 문의 : airbnbtrip@gmail.com</p>
        <button type="submit">보내기</button>
      </form>
    </div>
  );
}
