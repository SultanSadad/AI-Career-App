import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="w-full min-h-screen bg-[#F5F5F5] flex flex-col items-center py-12 px-6 space-y-16">
      
      {/* 1. HERO BIG ROUNDED CONTAINER (CENTERED) */}
      <section className="w-full max-w-5xl bg-[#D9D9D9] rounded-[40px] px-8 py-20 md:py-28 flex flex-col items-center text-center border border-neutral-300">
        {/* Pill Badge */}
        <div className="inline-flex items-center px-6 py-2 rounded-full bg-[#EAEAEA] border border-neutral-300 text-xs md:text-sm font-semibold text-neutral-800 mb-8 shadow-xs">
          Career Passport
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight max-w-4xl leading-[1.1]">
          Build your career once. Use it everywhere.
        </h1>

        {/* Subtitle */}
        <p className="text-neutral-700 text-sm md:text-base max-w-2xl mt-6 leading-relaxed">
          Create your professional profile once, then turn your experience, skills, and projects into a polished CV and career profile — all in one place.
        </p>

        {/* Hero CTA Button */}
        <div className="mt-8">
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-black font-bold text-sm border border-neutral-300 shadow-sm transition active:scale-95"
          >
            Build My Career Profile
          </Link>
        </div>
      </section>

      {/* 2. FOUR HORIZONTAL PROJECT CARDS (CENTERED GRID) */}
      <section className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex flex-col items-center text-center space-y-4 hover:border-neutral-400 transition"
          >
            {/* Gray Visual Placeholder */}
            <div className="w-full aspect-[4/3] rounded-xl bg-[#CECECE]" />
            
            {/* Content */}
            <div className="space-y-1.5 pt-1">
              <h3 className="font-bold text-base text-neutral-900">Projects</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Turn your projects into meaningful proof
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* 3. TALL PROJECT CARD (CENTERED) */}
      <section className="w-full max-w-md flex justify-center">
        <div 
  id="cv-print-area" 
  className="w-full bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8 text-left text-neutral-900 font-sans text-xs space-y-4 max-h-[700px] overflow-y-auto"
>
          <div className="space-y-3 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-black">Projects</h3>
            <p className="text-sm text-neutral-600 max-w-xs leading-relaxed">
              Turn your projects into meaningful proof of what you can actually do.
            </p>
            <div className="pt-2">
              <Link
                href="/dashboard"
                className="text-xs font-bold text-black hover:underline inline-flex items-center gap-1"
              >
                Read More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARTICLES FOR YOU (CENTERED) */}
      <section className="w-full max-w-md flex flex-col items-center space-y-4 text-center">
        <h4 className="text-sm font-bold text-neutral-800">
          Articles for <span className="text-blue-600">You</span>
        </h4>
        <div className="grid grid-cols-3 gap-3 w-full">
          {[
            { title: "Financial Strategy", badge: "Analytics" },
            { title: "Management", badge: "Workflow" },
            { title: "Streamlining Payments", badge: "$10,792" },
            { title: "Automate Finances", badge: "$2,350" },
            { title: "Save Money", badge: "Finance" },
            { title: "Revolutionize Strategy", badge: "$3,444" },
          ].map((article, idx) => (
            <div
              key={idx}
              className="bg-white border border-blue-100 rounded-xl p-3 shadow-xs space-y-2 flex flex-col items-center justify-between aspect-[3/4] text-center"
            >
              <div className="w-full h-10 rounded-lg bg-blue-50/80 flex items-center justify-center text-[10px] font-bold text-blue-600">
                {article.badge}
              </div>
              <div>
                <p className="text-[10px] font-semibold text-neutral-800 line-clamp-2">
                  {article.title}
                </p>
                <span className="text-[8px] text-blue-600 font-bold block mt-1 hover:underline">
                  Read More
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. EXPERIENCE CARD (CENTERED) */}
      <section className="w-full max-w-md flex justify-center">
        <div className="w-full bg-[#D9D9D9] rounded-2xl p-6 border border-neutral-300 space-y-2 text-center flex flex-col items-center">
          <h3 className="font-bold text-lg text-black">Experience</h3>
          <p className="text-xs text-neutral-700 max-w-xs leading-relaxed">
            Store your work and internship experience once. Reuse it whenever you need.
          </p>
        </div>
      </section>

    </div>
  );
}