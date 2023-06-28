import { useEffect, useRef } from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { Homepage, UserInfo } from "../interface";
import { kyWrapper } from "../utils";

export default function Home() {
  const pfpRef = useRef<HTMLImageElement>(null);
  const user = useRouteLoaderData("user") as UserInfo;
  const homepage = useLoaderData() as Homepage;

  useEffect(() => {
    kyWrapper(`${import.meta.env.VITE_API_URL}/photo`)
      .blob()
      .then((blob) => {
        let img = URL.createObjectURL(blob);
        pfpRef.current!.src = img;
      });
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row gap-4 items-center">
        <img
          ref={pfpRef}
          src="https://placehold.co/400"
          className="w-16 h-16 rounded-full flex-none"
        />

        <div className="flex flex-col gap-1">
          <strong className="text-sm font-bold">{user.name}</strong>
          <span className="text-xs">
            {user.group} - {user.role}
          </span>
        </div>
      </div>

      <h2 className="font-bold text-lg">Berita / Pengumuman</h2>

      {homepage.news.map((news) => {
        return (
          <div key={news.title} className="rounded-md bg-gray-200 p-2">
            <strong className="font-bold text-sm">{news.title}</strong>
            <p className="text-xs mt-2 whitespace-pre-line">
              {news.content.substring(
                0,
                news.content.trimEnd().lastIndexOf("\n") || news.content.length
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
