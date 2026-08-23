"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, UserCircle, Sparkles, Menu, X } from "lucide-react";
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
      <header className="bg-white border-b border-neutral-200 px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-6">
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-neutral-600 hover:bg-neutral-100 md:hidden cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FFEB43] text-black font-black flex items-center justify-center text-xs shadow-xs">
              CP
            </div>
            <span className="font-extrabold text-sm tracking-tight text-neutral-900">
              Career Passport
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navs.map((n) => {
              const isActive = activeNav ? activeNav === n.href.replace("/", "") : pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                    isActive
                      ? "bg-neutral-950 text-white"
                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Menu */}
        <UserMenu user={user} />
      </header>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 py-3 space-y-1 z-40">
          {navs.map((n) => {
            const Icon = n.icon;
            const isActive = activeNav ? activeNav === n.href.replace("/", "") : pathname === n.href;
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