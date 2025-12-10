import React from "react";
import Section from "../components/HeroSection";
import Categories from "../components/Categories";
import Homes from "../components/Homes";
import { Outlet } from "react-router-dom";

export default function Home({
  isLoggedIn,
  query,
  setQuery,
  handleReserve,
  showCategories,
  handleAddToCart,
}) {
  return (
    <>
      <Section query={query} setQuery={setQuery} />
      {showCategories && <Categories />}
      {showCategories ? (
        <Outlet />
      ) : (
        <Homes
          isLoggedIn={isLoggedIn}
          query={query}
          handleReserve={handleReserve}
          handleAddToCart={handleAddToCart}
        />
      )}
    </>
  );
}
