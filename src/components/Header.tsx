import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 임시 로그인 상태
  const navigate = useNavigate(); // 페이지 이동용

  return (
    <header className="relative bg-red-200 text-gray-800 py-4 shadow-md">
      <h1 className="text-3xl font-bold text-center tracking-wider">
        📰 News Pocket
      </h1>

      {/* 오른쪽 하단 버튼 */}
      <div className="absolute right-4 bottom-2 flex gap-3">
        {isLoggedIn ? (
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-sm px-3 py-1 bg-yellow-500 text-white rounded hover:bg-red-600 transition"
          >
            로그아웃
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
}
