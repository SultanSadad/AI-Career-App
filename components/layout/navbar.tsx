"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  User, 
  LogOut, 
  ChevronDown, 
  Briefcase, 
  FileText, 
  Sparkles, 
  LayoutDashboard 
} from "lucide-react";

interface NavbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Tutup dropdown saat klik di luar area
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Profile Assets", href: "/career-profile", icon: Briefcase },
    { label: "Resume Studio", href: "/cv-builder", icon: FileText },
    { label: "AI Insights", href: "/ai-insight", icon: Sparkles },
  ];

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "CP";

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-black/[0.06] font-['Canva_Sans',-apple-system,sans-serif]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black text-white font-bold text-xs flex items-center justify-center shadow-xs">
              CP
            </div>
            <span className="font-bold text-sm tracking-tight text-[#1D1D1F]">
              Career Passport
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-[#F5F5F7] text-[#1D1D1F] font-semibold"
                      : "text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]/60"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-[#F5F5F7] transition cursor-pointer"
          >
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || "User Avatar"}
                className="w-8 h-8 rounded-full object-cover border border-black/10"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#1D1D1F] text-[#FFEB43] font-bold text-xs flex items-center justify-center">
                {initials}
              </div>
            )}
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#86868B] transition-transform duration-200 hidden sm:block ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-black/[0.08] shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* Account Info Header */}
              <div className="px-4 py-2 border-b border-black/[0.05]">
                <p className="text-xs font-bold text-[#1D1D1F] truncate">
                  {user?.name || "User Profile"}
                </p>
                <p className="text-[11px] text-[#86868B] truncate">
                  {user?.email || "Signed in"}
                </p>
              </div>

              {/* Profile Links */}
              <div className="py-1">
                <Link
                  href="/career-profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition"
                >
                  <User className="w-3.5 h-3.5 text-[#86868B]" />
                  <span>Profile Assets</span>
                </Link>
              </div>

              {/* Log Out Action */}
              <div className="pt-1 border-t border-black/[0.05]">
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition cursor-pointer text-left"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}