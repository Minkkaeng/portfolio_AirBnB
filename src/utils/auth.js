// 로그인 상태 관리 유틸 (키는 무조건 'isLoggedIn'만 사용)
export const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";
export const login = () => localStorage.setItem("isLoggedIn", "true");
export const logout = () => localStorage.removeItem("isLoggedIn");
