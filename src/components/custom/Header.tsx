import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="fixed h-[4rem] w-full bg-slate-950 z-50 top-0 left-0 border-b border-green-800/30">
      <nav className="flex justify-between items-center container h-full px-3">
        <div className="flex-1">
          <Link href={"/"}>Fotmob clone</Link>
        </div>
        <ul className="flex-1 flex justify-around ">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/news"}>News</Link>
          </li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
