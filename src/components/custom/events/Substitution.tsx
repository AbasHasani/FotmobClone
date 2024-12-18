import React, { FC } from "react";
import { ArrowUpDown } from "lucide-react";
const Substitution: FC<any> = ({ in: inPlyaer, out, homeSide }) => {
  return (
    <div className={`flex gap-3 items-center ${homeSide ? "" : "flex-row-reverse"}`}>
      <ArrowUpDown />
      <div>
        <p className="font-bold text-lg">{inPlyaer.name}</p>
        <p className="font-light text-sm text-green-400/40">{out.name}</p>
      </div>
    </div>
  );
};

export default Substitution;
