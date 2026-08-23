"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, UserCircle, Sparkles, Settings } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Career Profile", href: "/career-profile", icon: UserCircle },
    { label: "CV Builder", href: "/cv-builder", icon: FileText },
    { label: "AI Insight", href: "/ai-insight", icon: Sparkles },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 min-h-screen p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div className="px-3 py-2">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FFEB43] text-black font-black flex items-center justify-center text-xs shadow-xs">
              CP
            </div>
            <span className="font-extrabold text-sm tracking-tight text-neutral-900">
              Career Passport
            </span>
          </Link>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? "bg-neutral-950 text-white"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#FFEB43]" : "text-neutral-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}