"use client";
import React, { useState } from "react";

const Page = () => {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={value}
        className="m-5 text-black p-3 rounded-md"
        onChange={(e) => setValue(e.target.value)}
      />
      <p>{Date.now()}</p>
      {value}
    </div>
  );
};

export default Page;
