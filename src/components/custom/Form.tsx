import { Form as FormType } from "@/generated/graphql";
import React from "react";
import Match from "./match";

const Form = ({
  data,
}: {
  data: { form: FormType; teamA: { name: string }; teamB: { name: string } };
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 m-4 md:m-0 md:mt-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-lg">{data.teamA.name}</h1>
        {data.form.allTeamA?.matches?.map((match) => (
          <Match key={match?.match?.id} {...match?.match} isImageAbsolute />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-lg">{data.teamB.name}</h1>
        {data.form.allTeamB?.matches?.map((match) => (
          <Match key={match?.match?.id} {...match?.match} isImageAbsolute />
        ))}
      </div>
    </div>
  );
};

export default Form;
