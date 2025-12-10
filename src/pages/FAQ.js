import React, { useMemo, useState } from "react";
import "../css/FAQ.css";

export default function FAQ() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);

  const data = useMemo(
    () => [
      { id: 1, q: "예약은 어떻게 하나요?", a: "상단 검색에서 날짜와 인원을 선택한 뒤 숙소 상세에서 예약 버튼을 누르면 됩니다. 예약은 로그인 이후 이용 가능합니다." },
      { id: 2, q: "예약 취소는 가능한가요?", a: "마이페이지의 예약확인에서 취소 버튼을 통해 취소할 수 있습니다." },
      { id: 3, q: "회원정보 수정은 어디에서 하나요?", a: "마이페이지 > 내 정보에서 이름, 이메일, 주소 등 기본 정보를 수정할 수 있습니다." },
      { id: 4, q: "문의는 어디로 보내나요?", a: "고객서비스 > 문의하기 > 이메일 문의는 양식에 맞게 작성하신 후 제출하면 됩니다.고객센터는 9시 ~ 18시까지 운영됩니다." }
    ],
    []
  );

  const filtered = useMemo(() => {
    const t = query.trim().toLowerCase();
    if (!t) return data;
    return data.filter(
      item => item.q.toLowerCase().includes(t) || item.a.toLowerCase().includes(t)
    );
  }, [data, query]);

  const toggle = id => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="faq-page">
      <h2>FAQ</h2>
      <div className="faq-search">
        <input
          type="text"
          placeholder="질문을 검색하세요"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="FAQ 검색"
        />
        <span className="faq-count">{filtered.length}개</span>
      </div>

      <ul className="faq-list">
        {filtered.map(item => {
          const isOpen = openId === item.id;
          return (
            <li key={item.id} className={`faq-item ${isOpen ? "open" : ""}`}>
              <button
                className="faq-question"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                id={`faq-button-${item.id}`}
                onClick={() => toggle(item.id)}
              >
                <span>{item.q}</span>
                <i className="faq-icon">{isOpen ? "−" : "+"}</i>
              </button>
              <div
                id={`faq-panel-${item.id}`}
                role="region"
                aria-labelledby={`faq-button-${item.id}`}
                className="faq-answer"
                style={{ maxHeight: isOpen ? "200px" : "0px" }}
              >
                <p>{item.a}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {filtered.length === 0 && (
        <div className="faq-empty">검색 결과가 없습니다.</div>
      )}
    </div>
  );
}
