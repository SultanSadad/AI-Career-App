"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, FileText, ChevronDown } from "lucide-react";

interface UserNavProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onSignOut: () => Promise<void>;
}

export function UserNav({ user, onSignOut }: UserNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "CP";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-full transition cursor-pointer"
      >
        <span className="text-xs font-semibold text-neutral-800 hidden sm:inline">
          {user.name?.split(" ")[0] ?? "Account"}
        </span>
        {user.image ? (
          <img
            src={user.image}
            alt={user.name ?? "Avatar"}
            className="w-7 h-7 rounded-full border border-neutral-200 object-cover"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#0A0A0A] text-[#FFEB43] font-bold text-[11px] flex items-center justify-center">
            {initials}
          </div>
        )}
        <ChevronDown className="w-3.5 h-3.5 text-neutral-400 mr-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-4 py-2.5 border-b border-neutral-100">
            <p className="text-xs font-bold text-neutral-900 truncate">{user.name}</p>
            <p className="text-[11px] text-neutral-500 truncate">{user.email}</p>
          </div>

          <div className="py-1">
            <Link
              href="/career-profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition"
            >
              <User className="w-4 h-4 text-neutral-400" />
              Career Profile (Data Source)
            </Link>
            <Link
              href="/cv-builder"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition"
            >
              <FileText className="w-4 h-4 text-neutral-400" />
              CV Generator
            </Link>
          </div>

          <div className="border-t border-neutral-100 pt-1">
            <button
              onClick={async () => {
                setIsOpen(false);
                await onSignOut();
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}