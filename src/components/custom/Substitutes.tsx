import Image from "next/image";
import React, { useState } from "react";

type Sub = {
  person: {
    name: string;
    id: string;
    image: {
      url: string;
    };
  };
  shirtNumber: number;
};

const Substitutes = ({ data }: { data: any }) => {
  const [showHome, setShowHome] = useState(true);
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
      <ul className="p-2 flex justify-around md:hidden">
        <li
          onClick={() => setShowHome(true)}
          className={`p-2 rounded-sm ${showHome ? "bg-green-800" : ""}`}
        >
          {data.teamA.name}
        </li>
        <li
          onClick={() => setShowHome(false)}
          className={`p-2 rounded-sm ${showHome ? "" : "bg-green-800"}`}
        >
          {data.teamB.name}
        </li>
      </ul>
      <ul className={`flex-col ${showHome ? "flex" : "hidden"} md:flex`}>
        {data.lineups.teamA.substitutes.map((sub: Sub) => (
          <div
            key={sub.person.id}
            className="flex items-center odd:bg-slate-800/20 even:bg-slate-900/20 p-3"
          >
            <Image
              src={sub.person.image.url}
              width={200}
              height={400}
              alt=""
              className="w-14 h-14 rounded-full"
            />
            <p className="mx-3">{sub.shirtNumber}</p>
            <p>{sub.person.name}</p>
          </div>
        ))}
      </ul>
      <ul className={`flex-col ${!showHome ? "flex" : "hidden"} md:flex`}>
        {data.lineups.teamB.substitutes.map((sub: Sub) => (
          <div
            key={sub.person.id}
            className="flex items-center odd:bg-slate-800/20 even:bg-slate-900/20 p-3"
          >
            <Image
              src={sub.person.image.url}
              width={200}
              height={400}
              alt=""
              className="w-14 h-14 rounded-full"
            />
            <p className="mx-3">{sub.shirtNumber}</p>
            <p>{sub.person.name}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Substitutes;
