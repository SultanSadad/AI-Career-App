import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AiInsightView } from "@/components/ai/ai-insight-view";

export default async function AiInsightPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      profile: {
        include: {
          experiences: { orderBy: { startDate: "desc" } },
          projects: { orderBy: { startDate: "desc" } },
          educations: { orderBy: { startDate: "desc" } },
          skills: true,
          certifications: true,
        },
      },
    },
  });

  const candidateProfile = {
    name: user?.name || "",
    headline: user?.profile?.headline || "",
    bio: user?.profile?.bio || "",
    experiences: user?.profile?.experiences || [],
    projects: user?.profile?.projects || [],
    educations: user?.profile?.educations || [],
    skills: (user?.profile?.skills || []).map((s) => s.name),
    certifications: user?.profile?.certifications || [],
  };

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-8 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-neutral-900">AI Career Intelligence</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-yellow-400 text-neutral-950 font-black text-[10px] uppercase tracking-wider">
              Gemini 3.6
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Analisis kecocokan profil CV dan evaluasi kesenjangan keahlian terhadap lowongan target.
          </p>
        </div>
      </div>

      {/* VIEW WRAPPER DENGAN TABS */}
      <AiInsightView
        userSkills={candidateProfile.skills}
        candidateProfile={candidateProfile}
      />
    </div>
  );
}