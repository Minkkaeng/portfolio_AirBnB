import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";

export default function Headers({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const menu = {
    숙소: [
      { label: "전체 숙소", to: "/" },
      { label: "해변", to: "/homes/beach" },
      { label: "산", to: "/homes/mountain" },
      { label: "도시", to: "/homes/city" },
    ],
    소개: [
      { label: "회사 소개", to: "/about" },
      { label: "호스트 되기", to: "/host" },
    ],
    고객서비스: [
      { label: "문의하기", to: "/contact" },
      { label: "FAQ", to: "/faq" },
    ],
  };

  return (
    <header className="header">
      <div className="headerlist">
        <p onClick={() => navigate("/")} className="logo">airbnb</p>

        <nav aria-label="주 메뉴">
          <ul className="mainmenu">
            {Object.entries(menu).map(([title, items]) => (
              <li className="menu-item has-sub" key={title}>
                <button type="button" className="menu-btn" aria-haspopup="true" aria-expanded="false">
                  {title}
                </button>
                <ul className="submenu" role="menu">
                  {items.map((it) => (
                    <li role="none" key={it.label}>
                      <button
                        type="button"
                        role="menuitem"
                        className="submenu-btn"
                        onClick={() => navigate(it.to)}
                      >
                        {it.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <div className="logsetting">
          {isLoggedIn ? (
            <>
              <button type="button" onClick={() => navigate("/mypage")}>마이페이지</button>
              <button type="button" onClick={onLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => navigate("/login")}>로그인</button>
              <button type="button" onClick={() => alert("회원가입 페이지는 준비 중입니다.")}>
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
