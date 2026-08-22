"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { 
  addExperienceAction, 
  addProjectAction, 
  addSkillAction,
  addEducationAction 
} from "@/app/actions/career-profile";
import { Plus } from "lucide-react";

export function ProfileModalsProvider({
  children,
}: {
  children: (openModal: (type: "exp" | "proj" | "skill" | "edu") => void) => React.ReactNode;
}) {
  const [modalType, setModalType] = useState<"exp" | "proj" | "skill" | "edu" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      {children((type) => setModalType(type))}

      {/* Modal Work Experience */}
      <Modal
        isOpen={modalType === "exp"}
        onClose={() => setModalType(null)}
        title="Add Work Experience"
      >
        <form
          action={async (formData) => {
            setIsSubmitting(true);
            await addExperienceAction(formData);
            setIsSubmitting(false);
            setModalType(null);
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Position / Role
            </label>
            <input
              name="position"
              required
              placeholder="e.g. Web Developer"
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Company
            </label>
            <input
              name="company"
              required
              placeholder="e.g. PT Example Tech"
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                required
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                End Date (Kosongkan jika current)
              </label>
              <input
                type="date"
                name="endDate"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Description & Key Accomplishments
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Jelaskan tanggung jawab utama dan pencapaian..."
              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-black hover:bg-neutral-800 disabled:bg-neutral-600 text-white rounded-xl text-xs font-bold transition cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save Experience"}
          </button>
        </form>
      </Modal>

      {/* Modal Projects */}
      <Modal
        isOpen={modalType === "proj"}
        onClose={() => setModalType(null)}
        title="Add Project Record"
      >
        <form
          action={async (formData) => {
            setIsSubmitting(true);
            await addProjectAction(formData);
            setIsSubmitting(false);
            setModalType(null);
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Project Title
            </label>
            <input
              name="title"
              required
              placeholder="e.g. Career Passport Web App"
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Repository / Demo URL (Optional)
            </label>
            <input
              type="url"
              name="link"
              placeholder="https://github.com/..."
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Description & Tech Stack
            </label>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="Jelaskan fitur, arsitektur, dan teknologi..."
              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-black hover:bg-neutral-800 disabled:bg-neutral-600 text-white rounded-xl text-xs font-bold transition cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save Project"}
          </button>
        </form>
      </Modal>

      {/* Modal Skills */}
      <Modal
        isOpen={modalType === "skill"}
        onClose={() => setModalType(null)}
        title="Add Skill / Tech Stack"
      >
        <form
          action={async (formData) => {
            setIsSubmitting(true);
            await addSkillAction(formData);
            setIsSubmitting(false);
            setModalType(null);
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Skill Name
            </label>
            <input
              name="name"
              required
              placeholder="e.g. Next.js, PostgreSQL, Tailwind CSS"
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Level
            </label>
            <select
              name="level"
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black"
            >
              <option value="Advanced">Advanced / Production</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Beginner">Beginner</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-black hover:bg-neutral-800 disabled:bg-neutral-600 text-white rounded-xl text-xs font-bold transition cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save Skill"}
          </button>
        </form>
      </Modal>

      {/* Modal Education */}
      <Modal
        isOpen={modalType === "edu"}
        onClose={() => setModalType(null)}
        title="Add Education"
      >
        <form
          action={async (formData) => {
            setIsSubmitting(true);
            await addEducationAction(formData);
            setIsSubmitting(false);
            setModalType(null);
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Institution / University
            </label>
            <input
              name="institution"
              required
              placeholder="e.g. Politeknik Negeri Batam"
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                Degree
              </label>
              <input
                name="degree"
                required
                placeholder="e.g. Diploma 3 (D3) / Bachelor"
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                Field of Study
              </label>
              <input
                name="fieldOfStudy"
                required
                placeholder="e.g. Informatics Engineering"
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              required
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-black hover:bg-neutral-800 disabled:bg-neutral-600 text-white rounded-xl text-xs font-bold transition cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save Education"}
          </button>
        </form>
      </Modal>
    </>
  );
}