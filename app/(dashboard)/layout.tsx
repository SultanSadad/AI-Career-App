import { ReactNode } from "react";
import { auth } from "@/auth";
import { Navbar } from "@/components/layout/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col antialiased">
      <Navbar user={session?.user} />
      <div className="flex-1 w-full flex flex-col justify-start">
        {children}
      </div>
    </div>
  );
}