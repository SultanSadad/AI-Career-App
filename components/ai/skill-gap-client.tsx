"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Target,
  Plus,
} from "lucide-react";
import { analyzeSkillGapWithAI, SkillGapResult } from "@/app/actions/ai-career";
import { addSkillAction } from "@/app/actions/career-profile";

interface SkillGapClientProps {
  userSkills: string[];
}

export function SkillGapClient({ userSkills }: SkillGapClientProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SkillGapResult | null>(null);
  const [addedSkills, setAddedSkills] = useState<Set<string>>(new Set());

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim() || !jobTitle.trim()) return;

    setLoading(true);
    setError(null);

    const res = await analyzeSkillGapWithAI({
      targetJobTitle: jobTitle,
      jobDescription,
      userSkills,
    });

    if (res.success && res.data) {
      setResult(res.data);
    } else {
      setError(res.error || "Gagal menganalisis skill gap.");
    }
    setLoading(false);
  };

  const handleQuickAddSkill = async (skillName: string) => {
    const formData = new FormData();
    formData.set("name", skillName);
    formData.set("level", "BEGINNER");
    await addSkillAction(formData);
    setAddedSkills((prev) => new Set([...prev, skillName.toLowerCase()]));
  };

  return (
    <div className="space-y-8">
      {/* INPUT FORM */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-xs">
        <form onSubmit={handleAnalyze} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Target Job Title *
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Senior Frontend Engineer, Cloud Architect, Product Manager"
              required
              className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-medium"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Paste Job Description / Requirements *
              </label>
              <span className="text-[11px] text-neutral-400">
                Skills terdaftar di profilmu: <strong className="text-neutral-700">{userSkills.length} skill</strong>
              </span>
            </div>
            <textarea
              rows={7}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste full job description, qualifications, and tech requirements from LinkedIn, JobStreet, or company career page..."
              required
              className="w-full text-xs p-3.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black leading-relaxed"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-600 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !jobTitle.trim() || !jobDescription.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 disabled:opacity-50 transition cursor-pointer shadow-sm"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-yellow-400" />
                  Menganalisis Kualifikasi...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  Analyze Skill Gap
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* RESULTS DISPLAY */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* TOP SUMMARY SCORE CARD */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-xs font-bold text-neutral-800">
                <Target className="w-3.5 h-3.5" /> Target: {jobTitle}
              </div>
              <h3 className="text-base font-bold text-neutral-900">Skill Alignment Assessment</h3>
              <p className="text-xs text-neutral-600 max-w-2xl leading-relaxed">
                {result.analysisSummary}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 rounded-2xl border border-neutral-200 shrink-0 min-w-[160px]">
              <span className="text-3xl font-black text-neutral-950">{result.matchPercentage}%</span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mt-1">
                Skill Match Rate
              </span>
            </div>
          </div>

          {/* 3 COLUMNS CATEGORIZATION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MATCHING SKILLS */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Matching Skills ({result.matchingSkills.length})</span>
              </div>
              <p className="text-[11px] text-neutral-500">Skill yang sudah kamu miliki dan sesuai kebutuhan lowongan.</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.matchingSkills.length > 0 ? (
                  result.matchingSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold"
                    >
                      ✓ {sk}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-neutral-400 italic">Belum ada skill yang cocok langsung.</span>
                )}
              </div>
            </div>

            {/* MISSING SKILLS */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                <XCircle className="w-4 h-4" />
                <span>Missing Skills ({result.missingSkills.length})</span>
              </div>
              <p className="text-[11px] text-neutral-500">Kualifikasi wajib lowongan yang belum ada di profilmu.</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.missingSkills.length > 0 ? (
                  result.missingSkills.map((sk) => {
                    const isAdded = addedSkills.has(sk.toLowerCase());
                    return (
                      <button
                        key={sk}
                        onClick={() => handleQuickAddSkill(sk)}
                        disabled={isAdded}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                          isAdded
                            ? "bg-neutral-100 text-neutral-400 border-neutral-200"
                            : "bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100"
                        }`}
                        title="Klik untuk menambahkan ke Career Profile"
                      >
                        {isAdded ? "✓ Added" : `+ ${sk}`}
                      </button>
                    );
                  })
                ) : (
                  <span className="text-xs text-neutral-400 italic">Tidak ada missing skill kritikal!</span>
                )}
              </div>
            </div>

            {/* RECOMMENDED SKILLS */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>Recommended ({result.recommendedSkills.length})</span>
              </div>
              <p className="text-[11px] text-neutral-500">Nilai tambah untuk membuat profilmu lebih unggul.</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.recommendedSkills.length > 0 ? (
                  result.recommendedSkills.map((sk) => {
                    const isAdded = addedSkills.has(sk.toLowerCase());
                    return (
                      <button
                        key={sk}
                        onClick={() => handleQuickAddSkill(sk)}
                        disabled={isAdded}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                          isAdded
                            ? "bg-neutral-100 text-neutral-400 border-neutral-200"
                            : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
                        }`}
                        title="Klik untuk menambahkan ke Career Profile"
                      >
                        {isAdded ? "✓ Added" : `+ ${sk}`}
                      </button>
                    );
                  })
                ) : (
                  <span className="text-xs text-neutral-400 italic">Tidak ada rekomendasi tambahan.</span>
                )}
              </div>
            </div>
          </div>

          {/* ACTION PLAN RECOMMENDATIONS */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Strategic Next Steps to Bridge the Gap
            </h4>
            <div className="space-y-2.5">
              {result.actionPlan.map((action, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100 text-xs text-neutral-700">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed font-medium">{action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}