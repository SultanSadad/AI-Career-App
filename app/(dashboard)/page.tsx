import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  let user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      profile: {
        include: {
          experiences: true,
          educations: true,
          skills: true,
          projects: true,
          achievements: true,
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
      },
    });
    user = { ...user, profile: newProfile };
  }

  return (
    <div className="flex-1 w-full p-6 md:p-8">
      <DashboardView user={user} profile={user?.profile ?? null} />
    </div>
  );
}