import { News as NewsType } from "@/generated/graphql";
import { requestGraphql, truncateAfterSpace } from "@/lib/utils";
import { gql } from "graphql-request";
import { Abril_Fatface } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const AbrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
});
const GET_NEWS = gql`
  query GetMatch {
    news {
      cards {
        title
        teaser
        url
        tags {
          tags {
            name
          }
        }
        image {
          image {
            src
          }
        }
      }
    }
  }
`;
const News = async () => {
  const res: any = await requestGraphql(GET_NEWS);
  const data = res.news as NewsType;
  if (!data || !data.cards) return <p>{JSON.stringify(data, null, 2)}</p>;
  return (
    <div className="flex-col gap-3 mx-3 col-span-2 hidden lg:flex ">
      <div className="my-3">
        <Link
          href={`/news`}
          className={`text-3xl font-bold hover:text-green-700 ${AbrilFatface.className}`}
        >
          See Breaking News
        </Link>
      </div>
      {data?.cards?.map((content, i) => (
        <Link
          href={`/news/${content?.url?.split("/").filter(Boolean).pop()}`}
          key={(content?.url || "") + i}
          className="border border-gray-700 flex flex-col bg-green-950/20 "
        >
          <Image
            src={content?.image?.image?.src || ""}
            width={400}
            height={500}
            alt="content-image"
            className="w-full h-[60%] object-cover"
          />
          <div className="flex-1 p-3 flex flex-col ">
            <h1 className="text-lg mb-3">{content?.title}</h1>
            <div className="flex flex-col justify-between h-full">
              <p className="text-sm text-gray-400">
                {truncateAfterSpace(content?.teaser || "")}
              </p>
              <p className="mt-2 text-slate-500 text-sm">
                {content?.tags?.tags?.map((tag) => tag?.name).join(" ● ")}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default News;
