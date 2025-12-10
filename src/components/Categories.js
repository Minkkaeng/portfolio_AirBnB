import React from "react";
import { Link } from "react-router-dom";

const CategoriesData = [
  { name: "전체", path: "/homes" },
  { name: "해변", path: "/homes/beach" },
  { name: "산", path: "/homes/mountain" },
  { name: "도시", path: "/homes/city" },
  { name: "전원", path: "/homes/country" }
];

export default function Categories() {
  return (
    <section className="categories page-section">
      <p>카테고리</p>
      <div className="categories-list">
        {CategoriesData.map((cat, idx) => (
          <Link key={idx} to={cat.path}>
            <button>{cat.name}</button>
          </Link>
        ))}
      </div>
    </section>
  );
}
