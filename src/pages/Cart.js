import React from "react";
import "../css/Cart.css";

export default function Cart({ cartItems, onRemove, onIncrease, onDecrease }) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (e, id) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      onDecrease(id);
    }
  };

  return (
    <div className="cart-page">
      <h2>장바구니</h2>

      <table className="cart-table">
        <thead>
          <tr>
            <th>선택</th>
            <th>상품정보</th>
            <th>옵션</th>
            <th>상품금액</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <input type="checkbox" defaultChecked />
                </td>
                <td className="product-info">
                  <img src={item.image} alt={item.name} />
                  <div className="info-text">
                    <h4>{item.name}</h4>
                    <p>{item.desc}</p>
                  </div>
                </td>
                <td>
                  <div className="quantity-box">
                    <button onClick={() => onDecrease(item.id)}>-</button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(e, item.id)}
                    />
                    <button onClick={() => onIncrease(item.id)}>+</button>
                  </div>
                </td>
                <td className="price-col">
                  {(item.price * item.quantity).toLocaleString()}원
                </td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => onRemove(item.id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="empty-row">
              <td colSpan="5">장바구니가 비어 있습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="cart-summary">
        <div>
          <span>총 상품금액</span>{" "}
          <strong>{totalPrice.toLocaleString()}원</strong>
        </div>
        <div>
          <span>배송비</span> <strong>무료</strong>
        </div>
        <div className="final-price">
          <span>총 결제금액</span>{" "}
          <strong>{totalPrice.toLocaleString()}원</strong>
        </div>
      </div>

      <div className="cart-actions">
        <button className="checkout-btn">예약</button>
      </div>
    </div>
  );
}
