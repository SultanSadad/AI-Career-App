"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Settings, LogOut, UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 p-1 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        aria-label="User Profile"
      >
        <div className="w-8 h-8 rounded-full bg-neutral-950 text-white font-black text-xs flex items-center justify-center border border-neutral-300">
          {initial}
        </div>
      </button>

      {/* Profile Modal / Dropdown Card */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-neutral-100">
            <p className="text-xs font-bold text-neutral-900 truncate">
              {user?.name || "User Account"}
            </p>
            <p className="text-[11px] text-neutral-500 truncate">{user?.email}</p>
          </div>

          {/* Action Links */}
          <div className="p-1 space-y-0.5">
            <Link
              href="/career-profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-xl transition"
            >
              <UserCircle className="w-4 h-4 text-neutral-500" />
              <span>Career Profile</span>
            </Link>

            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-xl transition"
            >
              <Settings className="w-4 h-4 text-neutral-500" />
              <span>Account & Settings</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="pt-1 mt-1 border-t border-neutral-100 p-1">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}