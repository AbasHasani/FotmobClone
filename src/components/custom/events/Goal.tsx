import { Goal as Ball } from "lucide-react";
import React from "react";

const Goal = ({ scorer, assist, homeSide, penalty }: any) => {
  return (
    <div
      className={`flex gap-3 items-center ${
        homeSide ? "" : "flex-row-reverse"
      }`}
    >
      <Ball />
      <div>
        <p className="font-bold text-lg text-green-300">{scorer.name}</p>
        {assist && (
          <p className="font-light text-sm text-green-600/40">{assist.name}</p>
        )}
        {penalty && <p className="font-light text-sm text-green-600/40">Penalty</p>}
      </div>
    </div>
  );
};

export default Goal;
