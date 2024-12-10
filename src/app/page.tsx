import CustomCalendar from "@/components/custom/calendar";
import MatchesPage from "@/components/custom/matches";
import News from "@/components/custom/SideNews";
import Image from "next/image";
import CalenderProvider from "@/components/providers/calender";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-7 m-2 gap-3">
        <News />
        <CalenderProvider>
          <MatchesPage />
          <CustomCalendar />
        </CalenderProvider>
      </div>
    </div>
  );
}
