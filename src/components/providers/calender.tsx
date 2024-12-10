"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export const Calender = createContext<{
  date: string;
  changeDate: (newDate: Date | undefined) => void;
}>({ date: "", changeDate: (newDate: Date | undefined) => {} });

const Provider = ({ children }: { children: ReactNode }) => {
  const [date, setDate] = useState<string>(
    new Date(Date.now()).toISOString().split("T")[0]
  );
  const changeDate = (newDate: Date | undefined) => {
    if (!newDate) return;
    const offset = newDate.getTimezoneOffset();
    newDate = new Date(newDate.getTime() - offset * 60 * 1000);
    setDate(() => newDate.toISOString().split("T")[0]);
  };
  return (
    <Calender.Provider value={{ date, changeDate }}>
      {children}
    </Calender.Provider>
  );
};

export const useCalender = () => useContext(Calender);

export default Provider;
