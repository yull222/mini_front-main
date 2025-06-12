import { type newsInfo } from "./NewsFetcher";

interface dataProps {
  data: newsInfo;
}

export default function NewsCard({ data }: dataProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 hover:scale-105 transition-transform duration-200">
      <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 mb-2">
          {data.title
            .replace(/<b>/g, "")
            .replace(/<\/b>/g, "")
            .replace(/&quot;/g, '"')}
        </h2>
        <p className="text-sm text-gray-500">{data.pubDate}</p>
      </a>
    </div>
  );
}
