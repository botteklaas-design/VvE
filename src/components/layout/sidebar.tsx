"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Euro,
  Wrench,
  Vote,
  Ticket,
  Building2,
  Settings,
  CreditCard,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/kosteninzicht", label: "Kosteninzicht", icon: Euro },
  { href: "/onderhoud", label: "Onderhoud", icon: Wrench },
  { href: "/besluitvorming", label: "Besluitvorming", icon: Vote },
  { href: "/tickets", label: "Tickets", icon: Ticket },
  { href: "/admin", label: "Beheer", icon: Settings },
  { href: "/admin/abonnementen", label: "Abonnementen", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-gray-200">
        <Building2 className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-lg font-bold text-gray-900">VvE Portaal</h1>
          <p className="text-xs text-gray-500">Zonnepark Residence</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
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
    </aside>
  );
}
