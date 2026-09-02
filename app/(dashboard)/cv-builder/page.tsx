import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CvBuilderClient } from "@/components/cv/cv-builder-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CVBuilderPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findFirst({
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
          certifications: true,
          achievements: true,
        },
      },
    },
  });

  if (!user || !user.profile) {
    redirect("/career-profile");
  }

  return (
    <main className="flex-1 flex flex-col w-full h-full">
      <CvBuilderClient profile={user.profile} user={user} />
    </main>
  );
}