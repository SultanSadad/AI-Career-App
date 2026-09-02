"use client";

import * as React from "react";
import { signOut } from "next-auth/react";
import { LogOut, User as UserIcon } from "lucide-react";

export function UserNav({ user }: { user?: { name?: string | null; email?: string | null; image?: string | null } }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : "U");

  return (
    <div className="relative" ref={menuRef}>
      {/* Tombol Avatar Profil Bulat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-800 font-semibold text-xs flex items-center justify-center hover:ring-2 hover:ring-neutral-400 focus:outline-none transition cursor-pointer"
        title="Akun Saya"
      >
        {initial}
      </button>

      {/* Modal / Menu Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-black/[0.08] p-2 z-50 animate-in fade-in-50 zoom-in-95">
          <div className="px-3 py-2 border-b border-black/[0.06] mb-1">
            <p className="text-xs font-semibold text-[#1D1D1F] truncate">
              {user?.name || "Pengguna"}
            </p>
            <p className="text-[11px] text-[#86868B] truncate">
              {user?.email || "Tidak ada email"}
            </p>
          </div>

          <a
            href="/career-profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-neutral-700 hover:bg-neutral-100 transition"
          >
            <UserIcon className="w-3.5 h-3.5 text-neutral-500" />
            <span>Profile Assets</span>
          </a>

          <button
            onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out / Keluar</span>
          </button>
        </div>
      )}
    </div>
  );
}