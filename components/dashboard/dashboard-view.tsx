"use client";

import Link from "next/link";
import {
  FileText,
  Sparkles,
  ArrowRight,
  Briefcase,
  Layers,
  GraduationCap,
  Wrench,
  Award,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getIndustryConfig } from "@/lib/industry-config";

interface DashboardViewProps {
  user: any;
  profile: any;
}

export function DashboardView({ user, profile }: DashboardViewProps) {
  const industryMeta = getIndustryConfig(
    profile?.industry || "it"
  );

  const portfolioTitle = industryMeta?.portfolioSectionTitle || "Key Projects";
  const industryName = industryMeta?.name || "Information Technology & Software";
  const industryBadge = industryMeta?.name?.split("&")[0]?.trim() || "Career Calibrated";

  // Checklist kesiapan profil tanpa Headline & Bio Summary (Total Bobot = 100%)
  const checklist = [
    { label: "Academic Major / Field Selected", isDone: Boolean(profile?.industry), weight: 20 },
    { label: "Contact Details & Location", isDone: Boolean(profile?.phone || profile?.location), weight: 10 },
    { label: "Work Experience Records", isDone: (profile?.experiences?.length ?? 0) > 0, weight: 25 },
    { label: portfolioTitle, isDone: (profile?.projects?.length ?? 0) > 0, weight: 25 },
    { label: "Education History", isDone: (profile?.educations?.length ?? 0) > 0, weight: 10 },
    { label: "Core Skills (Min. 3)", isDone: (profile?.skills?.length ?? 0) >= 3, weight: 10 },
  ];

  const completionPercentage = checklist.reduce(
    (acc, item) => (item.isDone ? acc + item.weight : acc),
    0
  );

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-8 space-y-6">
      {/* Hero Banner Clean */}
      <div className="bg-white rounded-[24px] border border-black/[0.04] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <Badge variant="blue">
            <Sparkles className="w-3 h-3" />
            <span>{industryBadge}</span>
          </Badge>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1D1D1F]">
            Welcome back, {user?.name?.split(" ")[0] ?? "Candidate"}
          </h1>

          <p className="text-xs md:text-sm text-[#86868B] leading-relaxed">
            Your career profile is calibrated for{" "}
            <span className="text-[#1D1D1F] font-semibold">{industryName}</span>. Your resume scoring and AI gap analysis use this benchmark.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <Link href="/cv-builder">
              <Button variant="primary" size="md">
                <FileText className="w-3.5 h-3.5" />
                <span>Tailor Resume</span>
              </Button>
            </Link>
            <Link href="/career-profile">
              <Button variant="secondary" size="md">
                <span>Manage Profile</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#86868B]" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Readiness & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Readiness Card */}
        <Card className="lg:col-span-1 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider">
                Profile Readiness
              </span>
              <span className="text-2xl font-bold text-[#1D1D1F]">
                {completionPercentage}%
              </span>
            </div>

            <div className="w-full h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0071E3] transition-all duration-500 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            <p className="text-[11px] text-[#86868B] leading-relaxed">
              {completionPercentage === 100
                ? "Profile is complete for maximum ATS match accuracy."
                : "Fill out missing sections to improve AI tailoring quality."}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-neutral-100">
            {checklist.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className={item.isDone ? "text-[#1D1D1F] font-medium" : "text-[#86868B]"}>
                  {item.label}
                </span>
                {item.isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
              </div>
            ))}
          </div>

          <Link href="/career-profile" className="w-full block">
            <Button variant="secondary" size="md" className="w-full">
              Update Profile Data
            </Button>
          </Link>
        </Card>

        {/* Quick Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: "Experiences", count: profile?.experiences?.length ?? 0, icon: Briefcase },
            { label: portfolioTitle.split(" ")[0], count: profile?.projects?.length ?? 0, icon: Layers },
            { label: "Skills", count: profile?.skills?.length ?? 0, icon: Wrench },
            { label: "Educations", count: profile?.educations?.length ?? 0, icon: GraduationCap },
            { label: "Achievements", count: profile?.achievements?.length ?? 0, icon: Award },
            { label: "Status", count: "Active", icon: Sparkles },
          ].map((stat, i) => (
            <Card key={i} className="p-5 flex flex-col justify-between">
              <div className="w-8 h-8 rounded-xl bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F]">
                <stat.icon className="w-4 h-4" />
              </div>
              <div className="pt-4">
                <div className="text-2xl font-bold text-[#1D1D1F]">{stat.count}</div>
                <p className="text-xs text-[#86868B] font-medium mt-0.5 truncate">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Feature Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/cv-builder" className="group block">
          <Card className="hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-black/10 transition flex items-center justify-between p-6">
            <div className="space-y-1 max-w-sm">
              <div className="flex items-center gap-2 font-semibold text-sm text-[#1D1D1F]">
                <FileText className="w-4 h-4 text-[#0071E3]" />
                <span>ATS Resume Studio</span>
              </div>
              <p className="text-xs text-[#86868B] leading-relaxed">
                Match your resume directly to specific job descriptions with AI suggestions.
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#F5F5F7] text-[#1D1D1F] group-hover:bg-[#1D1D1F] group-hover:text-white flex items-center justify-center transition shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Card>
        </Link>

        <Link href="/ai-insight" className="group block">
          <Card className="hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-black/10 transition flex items-center justify-between p-6">
            <div className="space-y-1 max-w-sm">
              <div className="flex items-center gap-2 font-semibold text-sm text-[#1D1D1F]">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Skill Gap & Match Insights</span>
              </div>
              <p className="text-xs text-[#86868B] leading-relaxed">
                Evaluate qualification alignment, missing requirements, and score breakdown.
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#F5F5F7] text-[#1D1D1F] group-hover:bg-[#1D1D1F] group-hover:text-white flex items-center justify-center transition shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Card>
        </Link>
      </div>
    </main>
  );
}