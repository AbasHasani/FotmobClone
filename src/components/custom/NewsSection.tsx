import { News } from "@/generated/graphql";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewsSection = ({ cards }: News) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards?.map((card, i) => (
        <Link
          href={`/news/${card?.url?.split("/").filter(Boolean).pop()}`}
          key={card?.url || "" + i}
          className={`bg-zinc-900 flex flex-col overflow-hidden
        ${i == 0 || i == 12 || i == 22 ? "col-span-1 md:col-span-2" : ""}
        `}
        >
          <Image
            width={card?.image?.image?.width || 100}
            height={card?.image?.image?.height || 100}
            src={card?.image?.image?.src || ""}
            alt={card?.image?.image?.alt || "news-image"}
            className={`${
              i == 0 || i == 1 || i == 12 || i == 11 || i == 22 || i == 23
                ? "h-[15rem] md:h-[30rem]"
                : "h-[15rem]"
            } w-full object-cover`}
            unoptimized
          />
          <div className="p-3 flex flex-col justify-between flex-1 gap-4">
            <h1 className="text-lg font-bold text-green-100">{card?.title}</h1>
            <div className="font-light text-sm text-gray-400">
              <p>{card?.teaser}</p>
              <p className="mt-2">
                {card?.tags?.tags?.map((tag) => tag?.name).join(" ● ")}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NewsSection;
