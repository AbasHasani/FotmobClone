import { fetchGraphql } from "@/lib/utils";
import { gql } from "@apollo/client";
import Image from "next/image";
import React from "react";

const GET_NEWS_ITEM = gql`
  query NewsItem($id: String!) {
    newsItem(id: $id) {
      slideList {
        article {
          headline
          id
          teaser
          poster {
            image {
              src
            }
          }
          body {
            body
          }
        }
        slides {
          headline
          body {
            body
          }
          id
          media {
            image {
              src
            }
          }
        }
      }
    }
  }
`;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const variables = { id };
  const data = await fetchGraphql(GET_NEWS_ITEM, variables);
  if (!data) return <p>No data hayy;;</p>;
  return (
    <div className="container md:w-3/4">
      <div className="flex flex-col items-center mx-auto">
        <Image
          src={data.data.newsItem.slideList.article.poster.image.src}
          width={100}
          height={200}
          alt=""
          className="md:h-[35rem] object-contain md:object-cover w-full"
          unoptimized
        />
        <h1 className="font-extrabold text-4xl p-3 text-center">
          {data.data.newsItem.slideList.article.headline}
        </h1>
        <p className="text-2xl text-gray-300 p-1">
          {data.data.newsItem.slideList.article.teaser}
        </p>
      </div>
      <div className="flex flex-col items-center mx-auto gap-1 mt-6">
        {data.data.newsItem.slideList.slides.map((slide: any) => (
          <div key={slide.id} className="bg-slate-800/30 w-full">
            {slide?.media?.image?.src && (
              <Image
                src={slide?.media?.image?.src || ""}
                width={100}
                height={200}
                alt=""
                className="md:h-[35rem] w-full object-contain md:object-cover"
                unoptimized
              />
            )}
            <div className="p-6">
              <p className="text-3xl font-bold p-5">{slide.headline}</p>
              <div className="text-slate-300" dangerouslySetInnerHTML={{ __html: slide.body.body }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
