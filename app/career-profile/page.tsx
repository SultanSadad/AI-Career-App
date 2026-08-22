import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/layout/app-header";
import { CareerProfileView } from "@/components/profile/career-profile-view";

export default async function CareerProfilePage() {
  const session = await auth();

  const user = session?.user?.email
    ? await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          profile: {
            include: {
              experiences: { orderBy: { startDate: "desc" } },
              educations: { orderBy: { startDate: "desc" } },
              skills: true,
              projects: true,
              certifications: true,
            },
          },
        },
      })
    : null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col">
      <AppHeader activeNav="career-profile" />
      <CareerProfileView profile={user?.profile ?? null} />
    </div>
  );
}