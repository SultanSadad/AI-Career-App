import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#FFEB43] selection:text-black">
      {/* Top Navbar */}
      <header className="h-20 border-b border-neutral-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFEB43] text-black font-black flex items-center justify-center text-sm shadow-[0_0_12px_rgba(255,235,67,0.3)]">
              CP
            </div>
            <span className="font-bold text-base tracking-tight text-[#0A0A0A]">
              Career Passport
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-neutral-600 hover:text-black transition"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A0A0A] text-white hover:bg-[#1f1f1f] text-xs font-bold transition shadow-sm"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5 text-[#FFEB43]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-neutral-100 py-10 bg-neutral-50 text-neutral-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Career Passport. Build your career once. Use it everywhere.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-black transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-black transition">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}