"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Euro,
  Wrench,
  Vote,
  Ticket,
  Menu,
  X,
  Building2,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/kosteninzicht", label: "Kosteninzicht", icon: Euro },
  { href: "/onderhoud", label: "Onderhoud", icon: Wrench },
  { href: "/besluitvorming", label: "Besluitvorming", icon: Vote },
  { href: "/tickets", label: "Tickets", icon: Ticket },
  { href: "/admin", label: "Beheer", icon: Settings },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-gray-600 hover:text-gray-900"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {open && (
        <div className="absolute top-16 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg">
          <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-100">
            <Building2 className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-gray-900">VvE Portaal</span>
          </div>
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
