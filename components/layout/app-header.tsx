import Link from "next/link";
import { auth, signOut } from "@/auth";
import { UserNav } from "./user-nav";

interface AppHeaderProps {
  activeNav?: "overview" | "career-profile" | "cv-builder" | "ai-insight";
}

export async function AppHeader({ activeNav }: AppHeaderProps) {
  const session = await auth();

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  const navItems = [
    { id: "overview", label: "Overview", href: "/overview" },
    { id: "career-profile", label: "Career Profile", href: "/career-profile" },
    { id: "cv-builder", label: "CV Builder", href: "/cv-builder" },
    { id: "ai-insight", label: "AI Insight", href: "/ai-insight" },
  ];

  return (
    <header className="w-full h-16 bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/cv-builder" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FFEB43] text-black font-black flex items-center justify-center text-xs shadow-xs">
              CP
            </div>
            <span className="font-extrabold text-sm tracking-tight text-neutral-900">
              Career Passport
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`text-xs font-semibold transition ${
                  activeNav === item.id
                    ? "text-neutral-900 font-bold border-b-2 border-black py-5"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {session?.user && (
          <UserNav user={session.user} onSignOut={handleSignOut} />
        )}
      </div>
    </header>
  );
}