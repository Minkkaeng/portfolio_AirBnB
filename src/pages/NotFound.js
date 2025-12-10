import React from "react";
import { Link } from "react-router-dom";
import "../css/NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-wrap">
      <div className="notfound-code">404</div>
      <div className="notfound-msg">요청하신 페이지를 찾을 수 없거나 주소가 변경되었습니다.</div>
      <Link to="/" className="notfound-home">홈으로 돌아가기</Link>
    </div>
  );
}
