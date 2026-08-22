import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/layout/app-header";
import { CVBuilderClient } from "@/components/cv/cv-builder-client";

export default async function CvBuilderPage() {
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
      <AppHeader activeNav="cv-builder" />
      <CVBuilderClient
        user={{
          name: session?.user?.name,
          email: session?.user?.email,
        }}
        profile={user?.profile ?? null}
      />
    </div>
  );
}