"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// type Role = "author" | "editor" | "super admin" | "finance";

interface MenuItem {
  label: string;
  href: string;
  // roles?: Role[];
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  { label: "Users", href: "/dashboard/users" },
  { label: "Modules", href: "/dashboard/modules" },
  { label: "Roles", href: "/dashboard/roles" },
];

export default function Sidebar() {
  const pathname = usePathname();

  //mengatasi supaya /dasboard tidak ikut aktif ketika menu lain sedang aktif
  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  // const filteredMenu = menuItems.filter((item) =>
  //   item.roles.includes("super admin")
  // );

  return (
    <aside className="w-52 bg-gray-800 border-r-2 border-gray-900 text-white min-h-screen p-4 space-y-4">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`block p-2 rounded hover:bg-gray-700 ${
            isActive(item.href) ? "bg-gray-700" : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </aside>
  );
}
