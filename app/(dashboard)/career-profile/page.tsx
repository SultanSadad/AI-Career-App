import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CareerProfileView } from "@/components/profile/career-profile-view";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CareerProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  // Cari user berdasarkan ID ATAU Email session
  let user = await prisma.user.findFirst({
    where: {
      OR: [
        ...(session.user.id ? [{ id: session.user.id }] : []),
        ...(session.user.email ? [{ email: session.user.email }] : []),
      ],
    },
    include: {
      profile: {
        include: {
          user: true,
          experiences: { orderBy: { startDate: "desc" } },
          educations: { orderBy: { startDate: "desc" } },
          projects: { orderBy: [{ startDate: "desc" }, { createdAt: "desc" }] },
          skills: true,
          achievements: true,
          certifications: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/api/auth/signin");
  }

  // Jika profile belum ada, buatkan baru
  if (!user.profile) {
    const newProfile = await prisma.profile.create({
      data: {
        userId: user.id,
        industry: "Information Technology & Software",
      },
      include: {
        user: true,
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
    <div className="text-neutral-900 flex flex-col">
      <CareerProfileView profile={user.profile} user={user} />
    </div>
  );
}