import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../css/DetailModal.css";
import { isLoggedIn as getLogin } from "../utils/auth";

export default function DetailModal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const close = () => navigate(-1);
  const closeBtnRef = useRef(null);

  // Homes에서 넘긴 데이터
  const item = useMemo(() => {
    const fromState = location.state && location.state.item;
    if (fromState && String(fromState.id) === String(id)) return fromState;
    return null;
  }, [location.state, id]);

  const [tab, setTab] = useState("details"); // details | map | images

  // ESC 닫기 + 배경 스크롤 잠금 + 포커스
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 예약 버튼: 로그인 확인 → 확인창 → /reserve 이동
  const handleReserveClick = () => {
    if (!getLogin()) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
      return;
    }
    if (!window.confirm("예약하시겠습니까?")) return;
    navigate("/reserve", { state: item ? item : { id, name: `상세보기 #${id}` } });
  };

  return (
    <div className="modal-overlay" onClick={close} role="dialog" aria-modal="true">
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button ref={closeBtnRef} className="modal-close" onClick={close} aria-label="닫기">×</button>

        <article className="detail-card">
          <div className="card-hero">
            {item?.image ? (
              <img src={item.image} alt={`${item?.name || "숙소"} 대표 이미지`} className="card-hero-img" />
            ) : (
              <div className="card-hero-fallback">이미지 없음</div>
            )}
          </div>

          <div className="card-head">
            <div className="card-title-wrap">
              <h3 className="card-title">{item?.name || `상세보기 #${id}`}</h3>
              <p className="card-sub">{item?.desc || "설명 정보가 없습니다."}</p>
            </div>
            <div className="card-meta">
              <span className="price">{item?.price || "-"}</span>
              {item?.category && <span className="badge">{item.category}</span>}
            </div>
            <div className="card-actions">
              <button className="btn ghost" onClick={close}>닫기</button>
              <button className="btn primary" onClick={handleReserveClick}>예약</button>
            </div>
          </div>

          <nav className="card-tabs" aria-label="상세 탭">
            <button type="button" className={tab === "details" ? "tab active" : "tab"} onClick={() => setTab("details")}>상세정보</button>
            <button type="button" className={tab === "map" ? "tab active" : "tab"} onClick={() => setTab("map")}>위치</button>
            <button type="button" className={tab === "images" ? "tab active" : "tab"} onClick={() => setTab("images")}>이미지</button>
          </nav>

          <section className="card-body">
            {tab === "details" && (
              <div className="panel">
                <h4>숙소 설명</h4>
                <p>{item?.desc || "상세 설명이 준비되지 않았습니다."}</p>

                <h4 style={{ marginTop: 16 }}>이용 안내</h4>
                <ul className="bulleted">
                  <li>체크인 15:00 이후, 체크아웃 11:00 이전</li>
                  <li>애완동물 동반 여부는 호스트 정책을 따릅니다</li>
                  <li>취소/환불 규정은 예약 페이지에서 확인하세요</li>
                </ul>
              </div>
            )}

            {tab === "map" && (
              <div className="panel">
                <h4>위치</h4>
                {item?.address ? (
                  <>
                    <p className="address">{item.address}</p>
                    <div className="map-box">지도 자리(추후 SDK 삽입)</div>
                  </>
                ) : (
                  <div className="map-empty">주소 정보가 없습니다.</div>
                )}
              </div>
            )}

            {tab === "images" && (
              <div className="panel">
                <h4>이미지</h4>
                <div className="gallery">
                  {Array.isArray(item?.images) && item.images.length > 0 ? (
                    item.images.map((src, i) => (
                      <div className="gallery-item" key={i}>
                        <img src={src} alt={`${item?.name || "숙소"} 추가 이미지 ${i + 1}`} loading="lazy" />
                      </div>
                    ))
                  ) : item?.image ? (
                    <div className="gallery-item">
                      <img src={item.image} alt={`${item?.name || "숙소"} 대표 이미지`} />
                    </div>
                  ) : (
                    <div className="gallery-empty">표시할 이미지가 없습니다.</div>
                  )}
                </div>
              </div>
            )}
          </section>
        </article>
      </div>
    </div>
  );
}
