// SearchHistoryFetcher.tsx

import { useEffect, useState } from "react";
import HistoryCard from "../pages/HistoryCard"; 

interface HistoryItem {
  query: string;
  searchedAt: string;
  id: string;
}

export default function SearchHistoryFetcher() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/history?userId=testuser`);
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("히스토리 불러오기 실패:", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      {history.map((item) => (
        <HistoryCard key={item.id} data={item} />
      ))}
    </div>
  );
}
