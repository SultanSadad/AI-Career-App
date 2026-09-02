import { auth } from "@/auth"; // atau path auth helper Anda
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Mengambil data profile candidate
  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: {
      experiences: true,
      educations: true,
      projects: true,
      skills: true,
      achievements: true,
    },
  });

  return <DashboardView user={session.user} profile={profile} />;
}