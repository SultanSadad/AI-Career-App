"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  AlertCircle,
  Briefcase,
  Lightbulb,
} from "lucide-react";
import { matchJobWithAI, type JobMatchingResult } from "@/app/actions/ai-career";

interface JobMatchingClientProps {
  candidateProfile: any;
}

export function JobMatchingClient({ candidateProfile }: JobMatchingClientProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<JobMatchingResult | null>(null);

  const handleMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim() || !jobTitle.trim()) return;

    setLoading(true);
    setError(null);

    const res = await matchJobWithAI({
      targetJobTitle: jobTitle,
      jobDescription,
      candidateProfile,
    });

    if (res.success && res.data) {
      setResult(res.data);
    } else {
      setError(res.error || "Gagal menganalisis kecocokan pekerjaan.");
    }
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  return (
    <div className="space-y-8">
      {/* FORM INPUT */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-xs">
        <form onSubmit={handleMatch} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Target Job Title *
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Full-Stack Web Developer, Product Manager"
              required
              className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-black font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Job Description & Qualifications *
            </label>
            <textarea
              rows={7}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target job description, requirements, responsibilities, and qualifications..."
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
                  Mengevaluasi Profil Lengkap...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  Generate Match Score
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* RESULT SECTION */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* HEADER SUMMARY SCORE */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-xs font-bold text-neutral-800">
                <Briefcase className="w-3.5 h-3.5" /> {jobTitle}
              </div>
              <h3 className="text-lg font-bold text-neutral-900">{result.verdict}</h3>
              <p className="text-xs text-neutral-600 max-w-2xl leading-relaxed">
                {result.summary}
              </p>
            </div>

            <div
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border shrink-0 min-w-[170px] ${getScoreColor(
                result.overallMatchScore
              )}`}
            >
              <span className="text-4xl font-black">{result.overallMatchScore}%</span>
              <span className="text-[10px] font-bold uppercase tracking-wider mt-1 text-neutral-600">
                Overall Match Score
              </span>
            </div>
          </div>

          {/* STRENGTHS & WEAKNESSES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* STRENGTHS */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Profile Strengths ({result.strengths.length})</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Kualifikasi & pengalamanmu yang memberikan nilai plus tinggi.
              </p>
              <div className="space-y-2 pt-1">
                {result.strengths.map((st, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-950 font-medium leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WEAKNESSES / GAPS */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Qualification Gaps ({result.weaknesses.length})</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Area kualifikasi yang belum terpenuhi atau kurang ditonjolkan.
              </p>
              <div className="space-y-2 pt-1">
                {result.weaknesses.map((wk, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-rose-50/60 border border-rose-100 text-xs text-rose-950 font-medium leading-relaxed"
                  >
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{wk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SKILLS OVERVIEW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-3">
              <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Matching Skills Found
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.matchingSkills.map((sk) => (
                  <span
                    key={sk}
                    className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold"
                  >
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-xs space-y-3">
              <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Missing Required Skills
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.missingSkills.map((sk) => (
                  <span
                    key={sk}
                    className="px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-lg text-xs font-semibold"
                  >
                    ✕ {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* STRATEGIC RECOMMENDATIONS */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              Strategic Recommendations to Win the Application
            </h4>
            <div className="space-y-2.5">
              {result.strategicRecommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100 text-xs text-neutral-700"
                >
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed font-medium">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}