"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

interface AppHeaderProps {
  activeNav?: string;
  userName?: string | null;
}

export function AppHeader({ activeNav, userName }: AppHeaderProps) {
  const pathname = usePathname();

  const navs = [
    { label: "Overview", href: "/dashboard" },
    { label: "Career Profile", href: "/career-profile" },
    { label: "CV Builder", href: "/cv-builder" },
    { label: "AI Insight", href: "/ai-insight" },
  ];

  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="font-extrabold text-base tracking-tight text-neutral-900">
          Career Passport
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navs.map((n) => {
            const isActive = activeNav ? activeNav === n.href.replace("/", "") : pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                  isActive
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-neutral-700 hidden sm:inline">
          {userName || "User"}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="p-1.5 text-neutral-400 hover:text-neutral-800 rounded-lg hover:bg-neutral-100 transition cursor-pointer"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}