"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  UserCircle,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { UserMenu } from "./user-menu";

interface AppHeaderProps {
  activeNav?: string;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export function AppHeader({ activeNav, user }: AppHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navs = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Career Profile", href: "/career-profile", icon: UserCircle },
    { label: "CV Builder", href: "/cv-builder", icon: FileText },
    { label: "AI Insight", href: "/ai-insight", icon: Sparkles },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F5F5F7]/80 backdrop-blur-md border-b border-black/[0.05]">
  <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
    <div className="flex items-center gap-6">
      <span className="font-semibold text-sm tracking-tight text-[#1D1D1F]">
        Career Passport
      </span>
      <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-[#86868B]">
        <Link href="/dashboard" className="hover:text-[#1D1D1F] transition">Dashboard</Link>
        <Link href="/career-profile" className="hover:text-[#1D1D1F] transition">Profile Assets</Link>
        <Link href="/cv-builder" className="hover:text-[#1D1D1F] transition">Resume Studio</Link>
        <Link href="/ai-insight" className="hover:text-[#1D1D1F] transition">AI Insights</Link>
      </nav>
    </div>
  </div>
</header>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 py-3 space-y-1 z-40">
          {navs.map((n) => {
            const Icon = n.icon;
            const isActive = activeNav
              ? activeNav === n.href.replace("/", "")
              : pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? "bg-neutral-950 text-white"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#FFEB43]" : "text-neutral-500"}`} />
                <span>{n.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}