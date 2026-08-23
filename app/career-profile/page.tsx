import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/layout/app-header";
import { CareerProfileView } from "@/components/profile/career-profile-view";
import { redirect } from "next/navigation";

export default async function CareerProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  let user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      profile: {
        include: {
          experiences: { orderBy: { startDate: "desc" } },
          educations: { orderBy: { startDate: "desc" } },
          skills: true,
          projects: true,
          achievements: true,
          certifications: true,
        },
      },
    },
  });

  if (user && !user.profile) {
    const newProfile = await prisma.profile.create({
      data: {
        userId: user.id,
        industry: "Information Technology & Software",
      },
      include: {
        experiences: true,
        educations: true,
        skills: true,
        projects: true,
        achievements: true,
        certifications: true,
      },
    });
    user = { ...user, profile: newProfile };
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col">
      <AppHeader activeNav="career-profile" userName={session.user.name} />
      <CareerProfileView profile={user?.profile ?? null} />
    </div>
  );
}