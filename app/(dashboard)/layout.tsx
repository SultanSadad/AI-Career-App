import { ReactNode } from "react";
import { auth } from "@/auth";
import { AppHeader } from "@/components/layout/app-header";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50/50">
      {/* Navbar Global Tunggal */}
      <AppHeader user={session?.user} />

      {/* Konten Halaman */}
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}