"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import {
  saveExperienceAction,
  saveProjectAction,
  saveEducationAction,
  saveAchievementAction,
  addSkillAction,
} from "@/app/actions/career-profile";

// 1. MODAL EXPERIENCE
export function ExperienceModal({
  isOpen,
  onClose,
  initialData,
  companyPlaceholder = "e.g. PT Example Tech",
  positionPlaceholder = "e.g. Frontend Developer",
  descPlaceholder = "- Spearheaded redesign of core features\n- Improved load speed by 35%",
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  companyPlaceholder?: string;
  positionPlaceholder?: string;
  descPlaceholder?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [isCurrent, setIsCurrent] = useState(initialData?.isCurrent ?? false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("isCurrent", String(isCurrent));
    if (initialData?.id) formData.set("id", initialData.id);

    await saveExperienceAction(formData);
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Work Experience" : "Add Work Experience"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Company / Organization *</label>
            <input
              name="company"
              defaultValue={initialData?.company ?? ""}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              placeholder={companyPlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Position / Role *</label>
            <input
              name="position"
              defaultValue={initialData?.position ?? ""}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              placeholder={positionPlaceholder}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Employment Type</label>
            <select
              name="employmentType"
              defaultValue={initialData?.employmentType ?? "Full-time"}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:border-black"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Location</label>
            <input
              name="location"
              defaultValue={initialData?.location ?? ""}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              placeholder="e.g. Batam / Remote"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Start Date *</label>
            <input
              type="date"
              name="startDate"
              defaultValue={initialData?.startDate ? new Date(initialData.startDate).toISOString().split("T")[0] : ""}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              disabled={isCurrent}
              defaultValue={initialData?.endDate ? new Date(initialData.endDate).toISOString().split("T")[0] : ""}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black disabled:bg-neutral-100"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isCurrentExp"
            checked={isCurrent}
            onChange={(e) => setIsCurrent(e.target.checked)}
            className="rounded border-neutral-300"
          />
          <label htmlFor="isCurrentExp" className="text-xs text-neutral-700 font-medium cursor-pointer">
            Currently working in this role
          </label>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Key Achievements & Responsibilities</label>
          <textarea
            name="description"
            defaultValue={initialData?.description ?? ""}
            rows={4}
            className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            placeholder={descPlaceholder}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs rounded-xl border border-neutral-200 font-medium hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-xs rounded-xl bg-neutral-950 text-white font-bold hover:bg-neutral-800 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Experience"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// 2. MODAL EDUCATION
export function EducationModal({
  isOpen,
  onClose,
  initialData,
  institutionPlaceholder = "e.g. Politeknik Negeri Batam",
  majorPlaceholder = "e.g. Teknik Informatika",
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  institutionPlaceholder?: string;
  majorPlaceholder?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (initialData?.id) formData.set("id", initialData.id);

    await saveEducationAction(formData);
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Education" : "Add Education"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Institution *</label>
          <input
            name="institution"
            defaultValue={initialData?.institution ?? ""}
            required
            className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            placeholder={institutionPlaceholder}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Degree *</label>
            <input
              name="degree"
              defaultValue={initialData?.degree ?? ""}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              placeholder="Diploma 3 (D3) / Bachelor's (S1)"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Field of Study / Major *</label>
            <input
              name="fieldOfStudy"
              defaultValue={initialData?.fieldOfStudy ?? ""}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              placeholder={majorPlaceholder}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Start Date *</label>
            <input
              type="date"
              name="startDate"
              defaultValue={initialData?.startDate ? new Date(initialData.startDate).toISOString().split("T")[0] : ""}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">End Date / Expected</label>
            <input
              type="date"
              name="endDate"
              defaultValue={initialData?.endDate ? new Date(initialData.endDate).toISOString().split("T")[0] : ""}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Description / GPA / Activities</label>
          <textarea
            name="description"
            defaultValue={initialData?.description ?? ""}
            rows={3}
            className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            placeholder="e.g. GPA: 3.85/4.00, Head of Informatics Club..."
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs rounded-xl border border-neutral-200 font-medium hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-xs rounded-xl bg-neutral-950 text-white font-bold hover:bg-neutral-800 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Education"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// 3. MODAL PROJECT
export function ProjectModal({
  isOpen,
  onClose,
  initialData,
  sectionTitle = "Portfolio Entry",
  titleLabel = "Title *",
  titlePlaceholder = "e.g. Case / Project Title",
  linkPlaceholder = "https://...",
  descPlaceholder = "- Description of deliverables\n- Key impact and results",
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  sectionTitle?: string;
  titleLabel?: string;
  titlePlaceholder?: string;
  linkPlaceholder?: string;
  descPlaceholder?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (initialData?.id) formData.set("id", initialData.id);

    await saveProjectAction(formData);
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? `Edit ${sectionTitle}` : `Add ${sectionTitle}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">{titleLabel}</label>
          <input
            name="title"
            defaultValue={initialData?.title ?? ""}
            required
            className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:outline-neutral-900"
            placeholder={titlePlaceholder}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Link Bukti / Portofolio</label>
          <input
            name="link"
            defaultValue={initialData?.link ?? ""}
            className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:outline-neutral-900"
            placeholder={linkPlaceholder}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Description & Impact *</label>
          <textarea
            name="description"
            defaultValue={initialData?.description ?? ""}
            required
            rows={4}
            className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:outline-neutral-900"
            placeholder={descPlaceholder}
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs rounded-lg border border-neutral-300 font-medium hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-xs rounded-lg bg-black text-white font-medium hover:bg-neutral-800 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Entry"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// 4. MODAL ACHIEVEMENT
export function AchievementModal({
  isOpen,
  onClose,
  initialData,
  titlePlaceholder = "e.g. Award / Competition Title",
  issuerPlaceholder = "e.g. Issuing Organization",
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  titlePlaceholder?: string;
  issuerPlaceholder?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (initialData?.id) formData.set("id", initialData.id);

    await saveAchievementAction(formData);
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Achievement" : "Add Achievement"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Title / Award Name *</label>
          <input
            name="title"
            defaultValue={initialData?.title ?? ""}
            required
            className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:outline-neutral-900"
            placeholder={titlePlaceholder}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Issuer / Organization</label>
          <input
            name="issuer"
            defaultValue={initialData?.issuer ?? ""}
            className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:outline-neutral-900"
            placeholder={issuerPlaceholder}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            defaultValue={initialData?.date ? new Date(initialData.date).toISOString().split("T")[0] : ""}
            className="w-full text-xs p-2 rounded-lg border border-neutral-300 focus:outline-neutral-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={initialData?.description ?? ""}
            rows={3}
            className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:outline-neutral-900"
            placeholder="Deskripsi pencapaian atau rekognisi..."
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs rounded-lg border border-neutral-300 font-medium hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-xs rounded-lg bg-black text-white font-medium hover:bg-neutral-800 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Achievement"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// 5. MODAL SKILL
export function SkillModal({
  isOpen,
  onClose,
  skillPlaceholder = "e.g. Contract Drafting, Financial Modeling, etc.",
}: {
  isOpen: boolean;
  onClose: () => void;
  skillPlaceholder?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await addSkillAction(formData);
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Skill">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Skill Name *</label>
          <input
            name="name"
            required
            className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:outline-neutral-900"
            placeholder={skillPlaceholder}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">Proficiency Level</label>
          <select
            name="level"
            className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:outline-neutral-900 bg-white"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs rounded-lg border border-neutral-300 font-medium hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-xs rounded-lg bg-black text-white font-medium hover:bg-neutral-800 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Skill"}
          </button>
        </div>
      </form>
    </Modal>
  );
}