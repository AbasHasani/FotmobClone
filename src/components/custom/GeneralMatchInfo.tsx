import React from "react";

const GeneralMatchInfo = ({ data }: { data: any }) => {
  return (
    <ul className=" odd:bg-slate-800/20 rounded-sm flex flex-col my-3 overflow-hidden">
      <li className="even:bg-slate-900/20 p-3 text-green-100">
        <span className="text-muted-foreground text-sm mr-2">Date:</span>{" "}
        {data?.startDate ? new Date(data.startDate).toDateString() : "-"}
      </li>
      <li className="even:bg-slate-900/20 p-3 text-green-100">
        <span className="text-muted-foreground text-sm mr-2">Venue:</span>{" "}
        {data?.venue?.name || "-"}
      </li>
      <li className="even:bg-slate-900/20 p-3 text-green-100">
        <span className="text-muted-foreground text-sm mr-2">Referee:</span>{" "}
        {data?.referee || "-"}
      </li>
      {data?.round?.display && (
        <li className="even:bg-slate-900/20 p-3 text-green-100">
          <span className="text-muted-foreground text-sm mr-2">Round:</span>{" "}
          {data?.round?.name || "-"}
        </li>
      )}
      <li className="even:bg-slate-900/20 p-3 text-green-100">
        <span className="text-muted-foreground text-sm mr-2">Competition:</span>{" "}
        {data?.competition?.name || "-"}
      </li>
      <li className="even:bg-slate-900/20 p-3 text-green-100 capitalize">
        <span className="text-muted-foreground text-sm mr-2">Status:</span>{" "}
        {data?.status?.toLowerCase() || "-"}
      </li>
    </ul>
  );
};

export default GeneralMatchInfo;
