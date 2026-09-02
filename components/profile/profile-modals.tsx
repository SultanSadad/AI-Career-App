"use client";

import { useState, useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import { AiExperienceModal } from "@/components/profile/ai-experience-modal";
import {
  saveExperienceAction,
  saveProjectAction,
  saveEducationAction,
  saveCertificationAction,
  saveAchievementAction,
  addSkillAction,
} from "@/app/actions/career-profile";

/* =========================================================================
   1. WORK EXPERIENCE MODAL (WITH AI ENHANCE)
   ========================================================================= */
export function ExperienceModal({
  isOpen,
  onClose,
  initialData,
  companyPlaceholder = "e.g., PT Teknologi Digital Nusantara",
  positionPlaceholder = "e.g., Lead Full-Stack Engineer",
  descPlaceholder = "Outline your core achievements and impact...",
}: any) {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setPosition(initialData.position || "");
      setCompany(initialData.company || "");
      setEmploymentType(initialData.employmentType || "Full-time");
      setLocation(initialData.location || "");
      setStartDate(
        initialData.startDate
          ? new Date(initialData.startDate).toISOString().split("T")[0]
          : ""
      );
      setEndDate(
        initialData.endDate
          ? new Date(initialData.endDate).toISOString().split("T")[0]
          : ""
      );
      setIsCurrent(Boolean(initialData.isCurrent));
      setDescription(initialData.description || "");
    } else {
      setPosition("");
      setCompany("");
      setEmploymentType("Full-time");
      setLocation("");
      setStartDate("");
      setEndDate("");
      setIsCurrent(false);
      setDescription("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-xl border border-neutral-200 my-8">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h3 className="text-sm font-bold text-neutral-900">
              {initialData ? "Edit Experience" : "Add Work Experience"}
            </h3>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            action={async (formData) => {
              await saveExperienceAction(formData);
              onClose();
            }}
            className="space-y-4"
          >
            {initialData?.id && (
              <input type="hidden" name="id" value={initialData.id} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Position / Role *
                </label>
                <input
                  name="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder={positionPlaceholder}
                  required
                  className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Company / Organization *
                </label>
                <input
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={companyPlaceholder}
                  required
                  className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black bg-white"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Location
                </label>
                <input
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Batam, Indonesia"
                  className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={endDate}
                  disabled={isCurrent}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black disabled:bg-neutral-100 disabled:text-neutral-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isCurrent"
                name="isCurrent"
                checked={isCurrent}
                onChange={(e) => setIsCurrent(e.target.checked)}
                className="rounded border-neutral-300 text-black focus:ring-black"
              />
              <label htmlFor="isCurrent" className="text-xs font-medium text-neutral-700">
                I currently work here
              </label>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-700">
                  Responsibilities & Impact
                </label>
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(true)}
                  className="flex items-center gap-1 text-[11px] font-bold text-neutral-900 bg-yellow-400/40 hover:bg-yellow-400 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
                  Enhance with AI
                </button>
              </div>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={descPlaceholder}
                rows={5}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-black leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 cursor-pointer"
              >
                Save Experience
              </button>
            </div>
          </form>
        </div>
      </div>

      <AiExperienceModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        position={position}
        company={company}
        currentDescription={description}
        onApply={(improved) => setDescription(improved)}
      />
    </>
  );
}

/* =========================================================================
   2. PROJECT / CASE / ENGAGEMENT MODAL (MAJOR-ADAPTIVE)
   ========================================================================= */
export function ProjectModal({
  isOpen,
  onClose,
  initialData,
  sectionTitle = "Project / Case Study",
  titleLabel = "Title",
  titlePlaceholder = "e.g., Enterprise Web Architecture / Statutory Audit",
  technologiesLabel = "Technologies / Methodologies",
  technologiesPlaceholder = "e.g., Next.js, PostgreSQL / SAP ERP, IFRS",
  linkPlaceholder = "https://...",
  descPlaceholder = "Key objectives, scope, tools applied, and quantifiable results...",
}: any) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [technologies, setTechnologies] = useState(initialData?.technologies || "");
  const [link, setLink] = useState(initialData?.link || "");
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl || "");
  const [startDate, setStartDate] = useState(
    initialData?.startDate
      ? new Date(initialData.startDate).toISOString().split("T")[0]
      : ""
  );
  const [endDate, setEndDate] = useState(
    initialData?.endDate
      ? new Date(initialData.endDate).toISOString().split("T")[0]
      : ""
  );

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setTechnologies(initialData.technologies || "");
      setLink(initialData.link || "");
      setGithubUrl(initialData.githubUrl || "");
      setStartDate(
        initialData.startDate
          ? new Date(initialData.startDate).toISOString().split("T")[0]
          : ""
      );
      setEndDate(
        initialData.endDate
          ? new Date(initialData.endDate).toISOString().split("T")[0]
          : ""
      );
    } else {
      setTitle("");
      setDescription("");
      setTechnologies("");
      setLink("");
      setGithubUrl("");
      setStartDate("");
      setEndDate("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-xl border border-neutral-200 my-8">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h3 className="text-sm font-bold text-neutral-900">
            {initialData ? `Edit ${sectionTitle}` : `Add ${sectionTitle}`}
          </h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          action={async (formData) => {
            await saveProjectAction(formData);
            onClose();
          }}
          className="space-y-4"
        >
          {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              {titleLabel} *
            </label>
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={titlePlaceholder}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              {technologiesLabel}
            </label>
            <input
              name="technologies"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder={technologiesPlaceholder}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Live URL / Reference</label>
              <input
                name="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder={linkPlaceholder}
                className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Repository / Document</label>
              <input
                name="githubUrl"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://..."
                className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Description & Scope</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={descPlaceholder}
              rows={4}
              className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 cursor-pointer"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================================
   3. EDUCATION MODAL
   ========================================================================= */
export function EducationModal({
  isOpen,
  onClose,
  initialData,
  institutionPlaceholder = "e.g., Politeknik Negeri Batam",
  majorPlaceholder = "e.g., Informatics Engineering",
}: any) {
  const [institution, setInstitution] = useState(initialData?.institution || "");
  const [degree, setDegree] = useState(initialData?.degree || "");
  const [fieldOfStudy, setFieldOfStudy] = useState(initialData?.fieldOfStudy || "");
  const [startDate, setStartDate] = useState(
    initialData?.startDate
      ? new Date(initialData.startDate).toISOString().split("T")[0]
      : ""
  );
  const [endDate, setEndDate] = useState(
    initialData?.endDate
      ? new Date(initialData.endDate).toISOString().split("T")[0]
      : ""
  );
  const [description, setDescription] = useState(initialData?.description || "");

  useEffect(() => {
    if (initialData) {
      setInstitution(initialData.institution || "");
      setDegree(initialData.degree || "");
      setFieldOfStudy(initialData.fieldOfStudy || "");
      setStartDate(
        initialData.startDate
          ? new Date(initialData.startDate).toISOString().split("T")[0]
          : ""
      );
      setEndDate(
        initialData.endDate
          ? new Date(initialData.endDate).toISOString().split("T")[0]
          : ""
      );
      setDescription(initialData.description || "");
    } else {
      setInstitution("");
      setDegree("");
      setFieldOfStudy("");
      setStartDate("");
      setEndDate("");
      setDescription("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-xl border border-neutral-200 my-8">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h3 className="text-sm font-bold text-neutral-900">
            {initialData ? "Edit Education" : "Add Education"}
          </h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          action={async (formData) => {
            await saveEducationAction(formData);
            onClose();
          }}
          className="space-y-4"
        >
          {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Institution *
            </label>
            <input
              name="institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder={institutionPlaceholder}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Degree</label>
              <input
                name="degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="e.g., Associate Degree (D3) / Bachelor (S1)"
                className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Field of Study</label>
              <input
                name="fieldOfStudy"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                placeholder={majorPlaceholder}
                className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Description / Coursework</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Graduated with Honors, GPA, Relevant Thesis..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 cursor-pointer"
            >
              Save Education
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================================
   4. CERTIFICATIONS MODAL
   ========================================================================= */
export function CertificationModal({
  isOpen,
  onClose,
  initialData,
}: any) {
  const [name, setName] = useState(initialData?.name || "");
  const [issuer, setIssuer] = useState(initialData?.issuer || "");
  const [issueDate, setIssueDate] = useState(
    initialData?.issueDate
      ? new Date(initialData.issueDate).toISOString().split("T")[0]
      : ""
  );
  const [expiryDate, setExpiryDate] = useState(
    initialData?.expiryDate
      ? new Date(initialData.expiryDate).toISOString().split("T")[0]
      : ""
  );
  const [credentialUrl, setCredentialUrl] = useState(initialData?.credentialUrl || "");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setIssuer(initialData.issuer || "");
      setIssueDate(
        initialData.issueDate
          ? new Date(initialData.issueDate).toISOString().split("T")[0]
          : ""
      );
      setExpiryDate(
        initialData.expiryDate
          ? new Date(initialData.expiryDate).toISOString().split("T")[0]
          : ""
      );
      setCredentialUrl(initialData.credentialUrl || "");
    } else {
      setName("");
      setIssuer("");
      setIssueDate("");
      setExpiryDate("");
      setCredentialUrl("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-xl border border-neutral-200 my-8">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h3 className="text-sm font-bold text-neutral-900">
            {initialData ? "Edit Certification" : "Add Certification"}
          </h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          action={async (formData) => {
            await saveCertificationAction(formData);
            onClose();
          }}
          className="space-y-4"
        >
          {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Certification Name *
            </label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., AWS Certified Solutions Architect / CFA Level 1 / CPA"
              required
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Issuing Organization *
            </label>
            <input
              name="issuer"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="e.g., AWS / CFA Institute / IAPI"
              required
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Issue Date *</label>
              <input
                type="date"
                name="issueDate"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Credential URL</label>
            <input
              name="credentialUrl"
              value={credentialUrl}
              onChange={(e) => setCredentialUrl(e.target.value)}
              placeholder="https://..."
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 cursor-pointer"
            >
              Save Certification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================================
   5. ACHIEVEMENTS & HONORS MODAL
   ========================================================================= */
export function AchievementModal({
  isOpen,
  onClose,
  initialData,
  titlePlaceholder = "e.g., 1st Place National Hackathon / Best Oralist Moot Court",
  issuerPlaceholder = "e.g., Ministry of ICT / International Law Association",
}: any) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [issuer, setIssuer] = useState(initialData?.issuer || "");
  const [date, setDate] = useState(
    initialData?.date
      ? new Date(initialData.date).toISOString().split("T")[0]
      : ""
  );
  const [description, setDescription] = useState(initialData?.description || "");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setIssuer(initialData.issuer || "");
      setDate(
        initialData.date
          ? new Date(initialData.date).toISOString().split("T")[0]
          : ""
      );
      setDescription(initialData.description || "");
    } else {
      setTitle("");
      setIssuer("");
      setDate("");
      setDescription("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-xl border border-neutral-200 my-8">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h3 className="text-sm font-bold text-neutral-900">
            {initialData ? "Edit Achievement" : "Add Achievement"}
          </h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          action={async (formData) => {
            await saveAchievementAction(formData);
            onClose();
          }}
          className="space-y-4"
        >
          {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Achievement Title *
            </label>
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={titlePlaceholder}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Issuing Organization / Event
            </label>
            <input
              name="issuer"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder={issuerPlaceholder}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail your competition scope or achievement..."
              rows={3}
              className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 cursor-pointer"
            >
              Save Achievement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================================
   6. SKILL MODAL
   ========================================================================= */
export function SkillModal({
  isOpen,
  onClose,
  skillPlaceholder = "e.g., TypeScript, Financial Modeling, Legal Drafting",
}: any) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("INTERMEDIATE");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-xl border border-neutral-200">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h3 className="text-sm font-bold text-neutral-900">Add Custom Skill</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          action={async (formData) => {
            await addSkillAction(formData);
            onClose();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Skill Name *
            </label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={skillPlaceholder}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Proficiency Level</label>
            <select
              name="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-black bg-white"
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
              <option value="EXPERT">Expert</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 cursor-pointer"
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}