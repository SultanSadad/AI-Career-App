import Link from "next/link";
import { auth } from "@/auth";
import {
  Sparkles,
  FileText,
  UserCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Layers,
  ShieldCheck,
  TrendingUp,
  BrainCircuit,
  Compass,
} from "lucide-react";

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-neutral-900 flex flex-col selection:bg-[#FFEB43] selection:text-black">
      {/* 1. PUBLIC NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#FBFBFA]/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FFEB43] text-black font-black flex items-center justify-center text-xs shadow-xs border border-neutral-900/10">
              CP
            </div>
            <span className="font-extrabold text-base tracking-tight text-neutral-900">
              Career Passport
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-neutral-600">
            <a href="#value-prop" className="hover:text-black transition">Why Us</a>
            <a href="#features" className="hover:text-black transition">Features</a>
            <a href="#ai-intelligence" className="hover:text-black transition">AI Intelligence</a>
            <a href="#how-it-works" className="hover:text-black transition">How It Works</a>
          </nav>

          <div className="flex items-center gap-3">
            {session?.user ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition cursor-pointer shadow-xs"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
                >
                  Sign In
                </Link>
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-950 text-white text-xs font-bold hover:bg-neutral-800 transition cursor-pointer shadow-xs"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>AI Career Copilot — Powered by Gemini 3.6 Flash</span>
          </div>

          {/* MAIN HEADLINE */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-neutral-950 leading-[1.08]">
            One Career Profile. <br />
            <span className="bg-gradient-to-r from-neutral-950 via-neutral-700 to-neutral-500 bg-clip-text text-transparent">
              Infinite Tailored Resumes.
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Hentikan kebiasaan membuat CV baru dari nol setiap kali melamar. Kelola riwayat karirmu di satu tempat, dan biarkan AI menyesuaikan resume serta menganalisis kecocokan loker dalam hitungan detik.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/login"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-[#FFEB43] text-black font-black text-sm hover:bg-yellow-400 transition cursor-pointer shadow-sm border border-neutral-900/10"
            >
              <span>Build Your Passport Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-neutral-200 text-neutral-800 font-bold text-sm hover:bg-neutral-50 transition cursor-pointer shadow-2xs"
            >
              <Compass className="w-4 h-4 text-neutral-500" />
              <span>Explore Features</span>
            </a>
          </div>

          {/* VALUE PROP PILLARS */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% ATS-Compliant Layout</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Single Source of Truth</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Instant Job Match Score</span>
            </div>
          </div>
        </div>

        {/* 3. PRODUCT UI PREVIEW SHOWCASE */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14">
          <div className="relative rounded-3xl border border-neutral-300 bg-white p-3 md:p-5 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              </div>
              <div className="text-[11px] font-mono bg-neutral-100 px-3 py-1 rounded-full text-neutral-500 font-bold">
                careerpassport.app/cv-builder
              </div>
              <div className="text-[11px] font-bold text-neutral-400">Gemini 3.6 Active</div>
            </div>

            {/* MOCKUP CONTENT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-neutral-50 rounded-2xl p-4 md:p-6 border border-neutral-200">
              {/* Left Column: AI Controls & Matching */}
              <div className="md:col-span-5 space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> AI Job Tailor
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      92% MATCH
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 font-mono">
                    Target: Senior Frontend Engineer (React/Next.js)
                  </div>
                  <div className="space-y-1 text-[11px] text-neutral-700">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 8 Skills Matched (Next.js, TS, Tailwind)
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-600 font-medium">
                      <Zap className="w-3.5 h-3.5 text-yellow-500" /> 3 Bullet points upgraded with Google XYZ
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-neutral-800">Enabled Resume Sections</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Summary", "Work Experience", "Key Projects", "Education", "Skills", "Achievements"].map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-[10px] font-bold text-neutral-700">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: ATS Resume Preview Mock */}
              <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-3 font-sans">
                <div className="border-b border-neutral-200 pb-3">
                  <h3 className="text-base font-black text-neutral-900 tracking-tight">SULTAN SADAD</h3>
                  <p className="text-[11px] font-semibold text-neutral-600">Full-Stack Software Engineer • Batam, Indonesia • sultan@example.com</p>
                </div>
                <div className="space-y-1.5">
                  <div className="text-[10px] font-black tracking-wider text-neutral-900 uppercase border-b border-neutral-200 pb-0.5">
                    PROFESSIONAL EXPERIENCE
                  </div>
                  <div className="text-[11px]">
                    <div className="flex justify-between font-bold text-neutral-900">
                      <span>Full-Stack Web Developer</span>
                      <span className="text-neutral-500 font-normal">2024 — Present</span>
                    </div>
                    <p className="text-[10px] text-neutral-600 leading-relaxed mt-0.5">
                      • Engineered modern web applications with Next.js App Router & TypeScript, cutting page latency by 40%.<br />
                      • Architected automated workflows with n8n and PostgreSQL databases to scale client operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUE PROPOSITION: "BUILD ONCE, USE EVERYWHERE" */}
      <section id="value-prop" className="py-20 bg-white border-y border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Core Philosophy</span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-950">
              Build Once. Use Everywhere.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
              Satu profil karir pusat yang menjadi fondasi untuk menghasilkan puluhan variasi resume sesuai industri dan posisi yang kamu tuju.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-neutral-950 text-white flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5 text-[#FFEB43]" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">1. Master Career Profile</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Catat seluruh pencapaian, tech stack, proyek kuliah, magang, dan sertifikasi tanpa takut kepanjangan. Ini adalah gudang data karirmu.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-neutral-950 text-white flex items-center justify-center font-bold">
                <BrainCircuit className="w-5 h-5 text-[#FFEB43]" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">2. AI Job Tailoring</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Gemini 3.6 Flash memilih pengalaman dan skill paling relevan dengan kualifikasi loker secara otomatis dan menulis ulang poin dengan STAR method.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-neutral-950 text-white flex items-center justify-center font-bold">
                <FileText className="w-5 h-5 text-[#FFEB43]" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">3. Precision PDF Export</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Download resume ATS 1-halaman standar industri dengan margin presisi 3/4 inchi yang siap lolos screening sistem HRD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURE BREAKDOWN */}
      <section id="features" className="py-20 bg-[#FBFBFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Features Deep Dive</span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-950">
              Semua yang Anda Butuhkan untuk Menembus Seleksi Karir
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">Single Source of Truth (Career Profile)</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Pusat data karir lengkap dengan dukungan industri spesifik (Software Engineering, Data, UI/UX, Bisnis). Dilengkapi pengurutan kronologis, filter status, dan dukungan multi-teknologi.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-medium text-neutral-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Work Experience & Key Projects</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Skills tagging & Proficiency categorization</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Formal Education & Verified Certifications</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">Strict ATS Resume Builder</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Editor resume dengan template Classic ATS, Modern Minimal, dan Executive Two-Column. Memastikan format resume ramah parser mesin tanpa tabel rusak atau elemen grafis mengganggu.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-medium text-neutral-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Live Viewport Scaler pas dengan layar browser</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Section Order & Drag/Toggle visibility fleksibel</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Clean Print CSS untuk ekspor PDF 1 halaman tepat</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AI CAREER INTELLIGENCE */}
      <section id="ai-intelligence" className="py-20 bg-neutral-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 text-yellow-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              AI Job Matching & Skill Gap Analysis
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
              Ditenagai model Google Gemini 3.6 Flash untuk memberikan feedback faktual dan rekomendasi taktis terhadap lowongan kerja target.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>AI Job Match Score</span>
              </div>
              <h4 className="text-lg font-bold text-white">Evaluasi Profil Lengkap (0 - 100%)</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Mengevaluasi seluruh CV (pengalaman, proyek, pendidikan, dan skills) terhadap job requirement, menyajikan daftar kekuatan profil (*Strengths*), celah kualifikasi (*Weaknesses*), dan rekomendasi strategis.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Skill Gap & Action Plan</span>
              </div>
              <h4 className="text-lg font-bold text-white">Komparasi Skill & Rekomendasi Belajar</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Mendeteksi skill yang sudah kamu kuasai (*Matching Skills*) dan skill krusial yang belum kamu miliki (*Missing Skills*), lengkap dengan langkah aksi terarah sebelum mengirim lamaran.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Simple Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-950">Cara Kerja Career Passport</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 font-black text-sm flex items-center justify-center mx-auto text-neutral-900">
                01
              </div>
              <h4 className="text-sm font-bold text-neutral-900">Lengkapi Profil Sekali</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Isi pengalaman kerja, keahlian, dan proyek Anda ke dalam Master Career Profile.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 font-black text-sm flex items-center justify-center mx-auto text-neutral-900">
                02
              </div>
              <h4 className="text-sm font-bold text-neutral-900">Paste Loker Impian</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Tempel deskripsi lowongan target untuk dianalisis oleh AI Job Matching engine.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFEB43] border border-neutral-900/10 font-black text-sm flex items-center justify-center mx-auto text-neutral-950">
                03
              </div>
              <h4 className="text-sm font-bold text-neutral-900">Download Resume & Lamar</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Dapatkan resume ter-tailor dan kirim lamaran dengan skor kecocokan tertinggi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM CTA BANNER */}
      <section className="py-16 bg-[#FBFBFA] border-t border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight">
            Siap Membangun Resume ATS Profesional Anda?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto">
            Gabung sekarang, simpan data karirmu secara terstruktur, dan biarkan AI membantumu menembus pekerjaan impian.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-neutral-950 text-white font-extrabold text-sm hover:bg-neutral-800 transition cursor-pointer shadow-md"
            >
              <span>Mulai Sekarang Gratis</span>
              <ArrowRight className="w-4 h-4 text-[#FFEB43]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. CLEAN FOOTER */}
      <footer className="bg-white border-t border-neutral-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-[#FFEB43] text-black font-black flex items-center justify-center text-[10px]">
              CP
            </div>
            <span className="font-bold text-neutral-900">Career Passport</span>
            <span>• © {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <a href="#value-prop" className="hover:text-black transition">About</a>
            <a href="#features" className="hover:text-black transition">Features</a>
            <a href="#ai-intelligence" className="hover:text-black transition">AI Intelligence</a>
            <Link href="/login" className="hover:text-black transition font-bold text-neutral-900">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}