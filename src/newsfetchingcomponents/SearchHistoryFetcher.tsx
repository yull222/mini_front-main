import { useEffect, useState } from "react";
import HistoryCard from "../pages/HistoryCard";
import { useNavigate } from "react-router-dom";

interface HistoryItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  query: string;        // 검색어
  searchedAt: string;   // 검색 시각 (백에서 string으로 내려올 경우)
}

export default function SearchHistoryFetcher() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/history?userId=${userId}`);
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("히스토리 불러오기 실패:", err);
      }
    };

    fetchHistory();
  }, [userId]);

  if (!userId) {
    return (
      <div className="p-4 bg-yellow-50 border rounded shadow text-center">
        <p className="text-gray-800 font-semibold mb-3">
          로그인하시면 이전 검색 기록을 확인하실 수 있습니다.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          로그인 하러가기
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {history.map((item) => (
        <HistoryCard key={item.id} data={item} />
      ))}
    </div>
  );
}
