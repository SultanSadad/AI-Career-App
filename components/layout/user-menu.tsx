"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { User, Settings, LogOut, ChevronDown, Sparkles } from "lucide-react";

interface UserMenuProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "CP";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-neutral-100 transition cursor-pointer border border-transparent hover:border-neutral-200"
      >
        <div className="w-8 h-8 rounded-lg bg-neutral-950 text-[#FFEB43] font-black text-xs flex items-center justify-center shrink-0">
          {initials}
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-xs font-bold text-neutral-900 leading-tight">
            {user?.name || "Candidate"}
          </p>
          <p className="text-[10px] text-neutral-400 font-medium leading-tight truncate max-w-[120px]">
            {user?.email || "Account"}
          </p>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-neutral-400 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-2 border-b border-neutral-100">
            <p className="text-xs font-bold text-neutral-900">{user?.name || "User"}</p>
            <p className="text-[11px] text-neutral-500 truncate">{user?.email}</p>
          </div>

          <div className="py-1">
            <Link
              href="/career-profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black transition"
            >
              <User className="w-3.5 h-3.5 text-neutral-500" />
              <span>Career Profile</span>
            </Link>
            <Link
              href="/cv-builder"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI CV Tailor</span>
            </Link>
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:text-black transition"
            >
              <Settings className="w-3.5 h-3.5 text-neutral-500" />
              <span>Settings</span>
            </Link>
          </div>

          <div className="pt-1 border-t border-neutral-100">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}