import React from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  return (
    <div>
      <h2>상세보기 페이지</h2>
      <p>숙소 ID: {id}</p>
    </div>
  );
}
