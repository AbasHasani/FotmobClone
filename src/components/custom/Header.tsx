import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="fixed h-[4rem] w-full bg-slate-950 z-50 top-0 left-0 border-b border-green-800/30">
      <nav className="flex justify-between items-center container h-full px-3">
        <div className="flex-1">
          <Link href={"/"}>
            <Image
              src="/favicon.ico"
              width={100}
              height={100}
              alt="icon"
              className="rounded-sm w-[2rem] h-[2rem] bg-green-900"
            />
          </Link>
        </div>
        <ul className="flex-1 flex justify-around">
          <li className="hidden md:block hover:text-green-600 hover:underline">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="hover:text-green-600 hover:underline">
            <Link href={"/news"}>News</Link>
          </li>
          <li className="hidden md:block hover:text-green-600 hover:underline">
            <Link
              href={"https://portfolio-wheat-theta-12.vercel.app/"}
              target="_blank"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
