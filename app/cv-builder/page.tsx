import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/layout/app-header";
import { CvBuilderClient } from "@/components/cv/cv-builder-client";


export default async function CvBuilderPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }



  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      profile: {
        include: {
          experiences: { orderBy: { startDate: "desc" } },
          projects: { orderBy: { startDate: "desc" } },
          educations: { orderBy: { startDate: "desc" } },
          skills: true,
          certifications: { orderBy: { issueDate: "desc" } },
          achievements: { orderBy: { date: "desc" } },
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col">
      <AppHeader activeNav="cv-builder" user={session.user} />
      <main className="flex-1 flex flex-col">
        <CvBuilderClient user={user} profile={user?.profile} />
      </main>
    </div>
  );
}