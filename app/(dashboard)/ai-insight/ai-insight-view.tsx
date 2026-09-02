"use client";

import * as React from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { analyzeJobMatchAction } from "@/app/actions/ai";
import { getIndustryConfig } from "@/lib/industry-config";

export function AIInsightView({ profile }: { profile: any }) {
  const [jobTitle, setJobTitle] = React.useState("");
  const [jobDescription, setJobDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);
  const [errorMsg, setErrorMsg] = React.useState("");

  // Konfigurasi dinamis berdasarkan Major user
  const majorConfig = getIndustryConfig(profile?.industry);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await analyzeJobMatchAction({
        targetJobTitle: jobTitle || majorConfig.name,
        jobDescription,
      });

      if (res.success) {
        setResult(res.data);
      } else {
        setErrorMsg(res.error || "Failed to analyze.");
      }
    } catch (error: any) {
      setErrorMsg(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-8 space-y-8 text-left font-['Canva_Sans',-apple-system,sans-serif]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
              AI Career Intelligence & Skill Gap
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#E8E8ED] text-[#1D1D1F]">
              {majorConfig.name}
            </span>
          </div>
          <p className="text-xs md:text-sm text-[#86868B] mt-1">
            Real-time qualification alignment, keyword gap analysis, and tailored recommendations.
          </p>
        </div>
        <Badge variant="ai" className="self-start sm:self-auto py-1 px-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gemini 3.6 Flash</span>
        </Badge>
      </div>

      {/* Input Form Section */}
      <Card className="p-6 md:p-8 space-y-5">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1D1D1F]">
              Target Role / Job Title
            </label>
            <input
              type="text"
              placeholder={majorConfig.targetRolePlaceholder}
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] border border-transparent focus:border-[#0071E3] focus:bg-white outline-none transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1D1D1F]">
              Job Description & Qualifications <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={6}
              required
              placeholder={majorConfig.jobDescPlaceholder}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full px-4 py-3 text-xs rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] placeholder:text-[#86868B] border border-transparent focus:border-[#0071E3] focus:bg-white focus:outline-none transition-all resize-none"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
              {errorMsg}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run AI Gap & Fit Evaluation</span>
            </Button>
          </div>
        </form>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Top Score Banner */}
          <Card className="p-8 bg-white border border-black/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 text-center md:text-left">
              <Badge variant="ai" className="mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{result.verdict || "Candidate Assessment"}</span>
              </Badge>
              <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
                {result.overallMatchScore >= 80
                  ? "Strong Alignment with Role"
                  : result.overallMatchScore >= 60
                  ? "Moderate Alignment (Actionable Gaps)"
                  : "Targeted Upskilling Required"}
              </h2>
              <p className="text-xs text-[#555558] max-w-xl leading-relaxed">
                {result.summary}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-[#F5F5F7] border border-black/[0.04] min-w-[170px] shrink-0">
              <span className={`text-4xl md:text-5xl font-extrabold tracking-tight ${
                result.overallMatchScore >= 75 ? "text-emerald-600" : result.overallMatchScore >= 50 ? "text-amber-600" : "text-rose-600"
              }`}>
                {result.overallMatchScore}%
              </span>
              <span className="text-[11px] font-semibold text-[#86868B] mt-1 uppercase tracking-wider">
                Overall Fit Score
              </span>
            </div>
          </Card>

          {/* Skill Gap Analysis: Matching vs Missing Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Matching Skills */}
            <Card className="p-6 space-y-3 bg-emerald-50/40 border-emerald-200/60">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Matching Skills ({result.matchingSkills?.length || 0})
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.matchingSkills?.length > 0 ? (
                  result.matchingSkills.map((s: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-neutral-500">No direct skills matched yet.</span>
                )}
              </div>
            </Card>

            {/* Missing Skills (Skill Gap) */}
            <Card className="p-6 space-y-3 bg-rose-50/40 border-rose-200/60">
              <div className="flex items-center gap-2 text-rose-800">
                <XCircle className="w-4 h-4 text-rose-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Missing Skills / Skill Gap ({result.missingSkills?.length || 0})
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.missingSkills?.length > 0 ? (
                  result.missingSkills.map((s: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800 border border-rose-200"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-700 font-medium">All core job skills covered!</span>
                )}
              </div>
            </Card>
          </div>

          {/* Strengths & Weaknesses Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#1D1D1F]">
                <TrendingUp className="w-4 h-4 text-[#0071E3]" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Key Strengths
                </h3>
              </div>
              <ul className="space-y-1.5 text-xs text-[#333336]">
                {result.strengths?.map((str: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#0071E3] font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#1D1D1F]">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Identified Gaps
                </h3>
              </div>
              <ul className="space-y-1.5 text-xs text-[#333336]">
                {result.weaknesses?.map((w: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Strategic Recommendations */}
          <Card className="p-6 space-y-3 bg-[#F5F5F7]/80">
            <div className="flex items-center gap-2 text-[#1D1D1F]">
              <Sparkles className="w-4 h-4 text-[#0071E3]" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Actionable Resume Calibration Steps
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-[#333336]">
              {result.strategicRecommendations?.map((rec: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#1D1D1F] font-bold text-[10px] shrink-0 border border-black/[0.08]">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </main>
  );
}