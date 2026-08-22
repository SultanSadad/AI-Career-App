import { AppHeader } from "@/components/layout/app-header";

export default function CvBuilderPage() {
  const sections = [
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Work experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Project" },
    { id: "certifications", label: "Certifications" },
    { id: "achievements", label: "Achievement" },
    { id: "references", label: "References" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-neutral-900 flex flex-col">
      <AppHeader />

      <main className="max-w-7xl w-full mx-auto p-6 md:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Controls & Options (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Target Role Prompt Box */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-3">
            <div>
              <h2 className="font-bold text-sm text-neutral-900">Target Role (optional)</h2>
              <p className="text-xs text-neutral-500">
                Paste a job description or enter a role title — AI will tailor the CV for it.
              </p>
            </div>
            <textarea
              rows={4}
              placeholder='e.g. "Principal Product Designer at Linear - lead the design of our core product"'
              className="w-full p-3.5 text-xs bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black placeholder:text-neutral-400 resize-none"
            />
          </div>

          {/* 2. Template / Style Selector Grid */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-xs text-neutral-700">Choose Layout / Template</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="group cursor-pointer border border-neutral-200 hover:border-black rounded-xl overflow-hidden transition"
                >
                  <div className="h-28 bg-[#DCE4EC] group-hover:opacity-90 transition"></div>
                  <div className="p-3 bg-white">
                    <div className="w-16 h-2 bg-neutral-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Sections to Include Checklist */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="font-bold text-sm text-neutral-900">Sections to include</h2>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
              {sections.map((section) => (
                <label
                  key={section.id}
                  className="flex items-center gap-3 text-xs text-neutral-700 font-medium cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-black accent-black cursor-pointer"
                  />
                  {section.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Preview & Action (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* CV Canvas Container */}
          <div className="flex-1 min-h-[580px] bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs flex flex-col items-center justify-center text-center">
            <div className="w-12 h-16 border-2 border-dashed border-neutral-300 rounded-md mb-3 flex items-center justify-center text-neutral-300 font-bold text-xs">
              A4
            </div>
            <p className="text-xs text-neutral-400">CV Preview will render here</p>
          </div>

          {/* Generate Action Button */}
          <button className="w-full py-3.5 bg-[#C9D6E4] hover:bg-[#b8c7d7] text-neutral-800 font-bold text-xs rounded-xl transition cursor-pointer">
            Generate CV
          </button>
        </div>
      </main>
    </div>
  );
}