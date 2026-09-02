"use client";

import { useState } from "react";
import { Target, Award } from "lucide-react";
import { SkillGapClient } from "./skill-gap-client";
import { JobMatchingClient } from "./job-matching-client";
import { getIndustryConfig } from "@/lib/industry-config";

interface AiInsightViewProps {
  userSkills: string[];
  candidateProfile: any;
}

export function AiInsightView({ userSkills, candidateProfile }: AiInsightViewProps) {
  const [activeTab, setActiveTab] = useState<"matching" | "skillgap">("matching");

  return (
    <div className="space-y-6">
      {/* TAB SELECTOR */}
      <div className="flex items-center p-1 bg-neutral-100 rounded-2xl w-fit border border-neutral-200">
        <button
          onClick={() => setActiveTab("matching")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "matching"
              ? "bg-white text-neutral-900 shadow-xs"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Job Match Score
        </button>

        <button
          onClick={() => setActiveTab("skillgap")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "skillgap"
              ? "bg-white text-neutral-900 shadow-xs"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          Skill Gap Analysis
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === "matching" ? (
        <JobMatchingClient candidateProfile={candidateProfile} />
      ) : (
        <SkillGapClient userSkills={userSkills} />
      )}
    </div>
  );
}