import React from "react";
import { useNavigate } from "react-router-dom";

export default function Section({ query, setQuery }) {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const q = (query || "").trim();
    if (!q) return; // 빈 검색 막기. 필요없으면 삭제
    navigate(`/homes?search=${encodeURIComponent(q)}`);
  };

  return (
    <section className="hero-section page-section">
      <div className="hero-inner">
        <p>나를 위한 편한 여행</p>
        <span>airbnb</span>
      </div>

      <form className="hero-search" onSubmit={onSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="어디로 떠날까요?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="여행지 검색"
        />
        <button type="submit" aria-label="검색 실행">검색</button>
      </form>
    </section>
  );
}
