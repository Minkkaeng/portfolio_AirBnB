import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import Headers from "./components/Header";
import Footer from "./components/Footer";

import About from "./pages/About";
import Home from "./pages/Home";
import Homes from "./components/Homes";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import MyPage from "./pages/MyPage";
import Reserve from "./pages/Reserve";
import Confirm from "./pages/Confirm";
import DetailModal from "./components/DetailModal";

import { isLoggedIn as getLogin, login as doLogin, logout as doLogout } from "./utils/auth";

function App() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 상세보기 클릭 시 전달된 background
  const background = location.state && location.state.background;

  // 앱 시작 시 로그인 상태 복원
  useEffect(() => {
    if (getLogin()) setIsLoggedIn(true);
  }, []);

  // 로그인
  const handleLogin = (email, password) => {
    if (!email || !password) return;
    doLogin();
    setIsLoggedIn(true);
    navigate("/");
  };

  // 로그아웃
  const handleLogout = () => {
    doLogout();
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  // 예약
  const handleReserve = (home) => {
    if (!getLogin()) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
      return;
    }
    navigate("/reserve", { state: home });
  };

  // 장바구니 담기
  const handleAddToCart = (home) => {
    if (!getLogin()) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === home.id);
      if (existing) {
        return prev.map((item) =>
          item.id === home.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        { ...home, quantity: 1, price: Number(home.price.replace(/[₩,]/g, "")) },
      ];
    });
  };

  // 장바구니 조작
  const handleRemoveFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const handleIncreaseQuantity = (id) =>
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  const handleDecreaseQuantity = (id) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i))
    );

  return (
    <div className="App">
      <Headers isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      {/* 배경 라우팅: background가 있으면 그걸로 렌더 */}
      <Routes location={background || location}>
        <Route
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              query={query}
              setQuery={setQuery}
              handleReserve={handleReserve}
              showCategories={false}
              handleAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/homes"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              query={query}
              setQuery={setQuery}
              handleReserve={handleReserve}
              showCategories={true}
              handleAddToCart={handleAddToCart}
            />
          }
        >
          <Route
            index
            element={
              <Homes
                isLoggedIn={isLoggedIn}
                query={query}
                handleReserve={handleReserve}
                category=""
                handleAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="beach"
            element={
              <Homes
                isLoggedIn={isLoggedIn}
                query={query}
                handleReserve={handleReserve}
                category="beach"
                handleAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="mountain"
            element={
              <Homes
                isLoggedIn={isLoggedIn}
                query={query}
                handleReserve={handleReserve}
                category="mountain"
                handleAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="city"
            element={
              <Homes
                isLoggedIn={isLoggedIn}
                query={query}
                handleReserve={handleReserve}
                category="city"
                handleAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="country"
            element={
              <Homes
                isLoggedIn={isLoggedIn}
                query={query}
                handleReserve={handleReserve}
                category="country"
                handleAddToCart={handleAddToCart}
              />
            }
          />
        </Route>

        {/* 일반 페이지 */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />

        {/* 로그인 */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* 상세보기 풀페이지(링크 공유/새로고침 대비) */}
        <Route path="/detail/:id" element={<Detail />} />

        {/* 마이페이지 */}
        <Route
          path="/mypage"
          element={
            getLogin() ? (
              <MyPage
                cartItems={cart}
                onRemove={handleRemoveFromCart}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 기타 라우팅 */}
        <Route path="/cart" element={<Navigate to="/mypage?tab=cart" replace />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* 모달 라우트: background 있을 때만 덮어쓰기 */}
      {background && (
        <Routes>
          <Route path="/detail/:id" element={<DetailModal />} />
        </Routes>
      )}

      <Footer />
    </div>
  );
}

export default App;
