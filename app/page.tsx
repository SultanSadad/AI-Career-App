import Link from "next/link";
import { 
  Sparkles, 
  Layers, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  LogOut 
} from "lucide-react";
import { auth, signOut } from "@/auth";

export default async function HomePage() {
  const session = await auth();

  // Mengambil inisial nama untuk avatar fallback
  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "CP";

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#FAFAFA]">
      {/* 1. TOP NAVBAR */}
      <header className="w-full h-20 bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFEB43] text-black font-black flex items-center justify-center text-sm shadow-sm">
              CP
            </div>
            <span className="font-extrabold text-base tracking-tight text-[#0A0A0A]">
              Career Passport
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {session?.user?.email ?? "Connected"}
            </span>

            {/* Profile Avatar */}
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name ?? "User"}
                className="w-8 h-8 rounded-full border border-neutral-200 shadow-xs object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-[#FFEB43] font-bold text-xs flex items-center justify-center">
                {userInitials}
              </div>
            )}

            {/* Sign Out Button */}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                title="Sign Out"
                className="p-2 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main className="w-full max-w-6xl px-6 py-10 space-y-10">
        {/* HERO BANNER */}
        <section className="bg-[#0A0A0A] text-white rounded-3xl p-10 md:p-16 border border-neutral-800 shadow-xl flex flex-col items-center text-center">
          <div className="max-w-2xl flex flex-col items-center space-y-4">
            <div className="inline-block px-4 py-1 rounded-full bg-[#1C1C1C] border border-[#333333] text-xs font-semibold text-[#FFEB43]">
              Welcome back, {session?.user?.name?.split(" ")[0] ?? "Explorer"} 👋
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15]">
              Build your career once. <br />
              <span className="text-[#FFEB43]">Use it everywhere.</span>
            </h1>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg leading-relaxed">
              Create your professional profile once, then turn your experience, skills, and projects into a polished CV and career profile — all in one place.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FFEB43] text-black font-bold text-xs hover:bg-[#f5e032] transition shadow-md cursor-pointer">
                <Sparkles className="w-4 h-4 text-black" />
                Tailor CV with AI
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1C1C1C] border border-[#333333] text-white font-semibold text-xs hover:bg-[#252525] transition cursor-pointer">
                Update Career Profile
              </button>
            </div>
          </div>
        </section>

        {/* 3 CARDS ROW */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-black text-[#FFEB43] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900">Projects & Proof</h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Turn your projects into meaningful proof of what you can actually do.
              </p>
            </div>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-800">4 Projects Added</span>
              <span className="font-bold text-black cursor-pointer inline-flex items-center gap-0.5 hover:underline">
                View <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-black text-[#FFEB43] flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900">Experience Hub</h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Store your work and internship experience once. Reuse it whenever you need.
              </p>
            </div>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-800">2 Roles Recorded</span>
              <span className="font-bold text-black cursor-pointer inline-flex items-center gap-0.5 hover:underline">
                Manage <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFEB43] text-black flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900">AI Tailoring Engine</h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Match your profile with specific job descriptions to boost your ATS score.
              </p>
            </div>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Ready to generate
              </span>
              <span className="font-bold text-black cursor-pointer inline-flex items-center gap-0.5 hover:underline">
                Launch <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </section>

        {/* BOTTOM SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold text-base text-neutral-900">Career Single Source of Truth</h2>
                <p className="text-xs text-neutral-500">Keep your core records updated before exporting CVs.</p>
              </div>
              <button className="text-xs font-bold px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-800 transition cursor-pointer">
                Edit All
              </button>
            </div>

            <div className="divide-y divide-neutral-100">
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span className="text-xs font-medium text-neutral-800">Basic Info & Headline</span>
                </div>
                <span className="text-[11px] font-semibold text-neutral-400">Complete</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span className="text-xs font-medium text-neutral-800">Work & Internship Experience</span>
                </div>
                <span className="text-[11px] font-semibold text-neutral-400">Complete</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span className="text-xs font-medium text-neutral-800">Skills & Tech Stacks</span>
                </div>
                <span className="text-[11px] font-semibold text-neutral-400">Complete</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0A0A0A] text-white p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-black bg-[#FFEB43] px-2 py-0.5 rounded uppercase">
                Quick Action
              </span>
              <h3 className="font-bold text-base mt-3">Targeting a New Role?</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Paste target job requirements and let our AI select your best projects and tailor bullet points automatically.
              </p>
            </div>
            <button className="w-full mt-6 py-3 bg-[#FFEB43] hover:bg-[#f5e032] text-black font-bold text-xs rounded-xl transition cursor-pointer">
              Create Tailored CV
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}