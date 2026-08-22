import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8F8F8] text-neutral-900">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-800">
            <span className="w-2 h-2 rounded-full bg-[#0A0A0A]"></span>
            Career Passport Active
          </div>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            PostgreSQL Docker: <span className="font-semibold text-neutral-800">Connected (Port 5432)</span>
          </div>
        </header>

        {/* Workspace Canvas */}
        <div className="p-8 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}