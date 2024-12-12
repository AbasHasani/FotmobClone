import { IdCard } from "lucide-react";
import React from "react";

const Card = ({ player, homeSide, red }: any) => {
  return (
    <div
      className={`flex gap-3 items-center ${
        homeSide ? "" : "flex-row-reverse"
      }`}
    >
      <IdCard />
      <div>
        <p className="font-bold text-lg">{player.name}</p>
        <p className="font-light text-sm text-green-400/40">
          {red ? "Red" : "Yellow"}
        </p>
      </div>
    </div>
  );
};

export default Card;
