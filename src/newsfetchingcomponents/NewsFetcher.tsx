import { useEffect, useState, type ReactNode } from "react";
import NewsCard from "./NewsCard";

export interface newsFetcherProps {
  uriEncodedString: string;
}
export type newsInfo = {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
  id: string;
};
export default function NewsFetcher({ uriEncodedString }: newsFetcherProps) {
  //리퀘스트 헤더 만들고 api 키 넣기
  const apikey:string = import.meta.env.VITE_APP_APIKEY;
  const myHeaders: Headers = new Headers();
  myHeaders.append("X-Naver-Client-Id", "qQ0rDJDLUQdGBC0U6Ndl");
  myHeaders.append("X-Naver-Client-Secret", apikey);

  //리퀘스트 옵션 넣기
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  //받아온 정보 저장할 state, 데이터 가져올 핸들러
  const [news, setNews] = useState<newsInfo[] | undefined>();
  const fetchHandler = async () => {
    try {
      const resp:Response = await fetch(`/v1/search/news.json?query=${uriEncodedString}&display=12`, requestOptions);
      const jsn = await resp.json();
      setNews(await jsn.items);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
  if (!uriEncodedString) return;
  fetchHandler();
}, [uriEncodedString]);

  //원시적인 카드 만들어서 화면에 뿌리기
  const tags: ReactNode = news
    ? news.map((item: newsInfo) => <NewsCard data={item} key={item.title} />)
    : <div></div>;
    
  return <div className="w-11/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
    {tags}</div>;
}
