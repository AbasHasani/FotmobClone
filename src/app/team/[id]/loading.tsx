import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="grid place-items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Loading;
