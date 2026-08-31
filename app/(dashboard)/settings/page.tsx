import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SettingsView } from "@/components/settings/settings-view";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      profile: true,
    },
  });

  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-8 space-y-6">
      {/* HEADER */}
      <div className="border-b border-neutral-200 pb-5">
        <h1 className="text-2xl font-black text-neutral-900">Application Settings</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Kelola informasi profil, preferensi data, autentikasi sesi, dan pengaturan akun.
        </p>
      </div>

      <SettingsView user={user} profile={user.profile} />
    </div>
  );
}