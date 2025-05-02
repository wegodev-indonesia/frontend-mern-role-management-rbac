"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import logoutAction from "@/app/lib/logoutAction";

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!session?.user) return null;

  const subMenu = (menuOpen: boolean) => {
    if (menuOpen)
      return (
        <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg z-10">
          <button
            onClick={() => logoutAction()}
            className="block cursor-pointer hover:bg-gray-100 focus:bg-yellow-300 rounded w-full px-4 py-2 text-left"
          >
            Sign out
          </button>
        </div>
      );
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white border-b-2 border-gray-900">
      <div>
        <h2 className="text-xl font-bold">We APP</h2>
      </div>
      <div>
        Hi,{" "}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="cursor-pointer bg-transparent rounded hover:bg-transparent hover:text-gray-400 transition"
        >
          {session.user.fullname}
        </button>
        {subMenu(menuOpen)}
      </div>
    </header>
  );
}
