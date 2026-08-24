"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. SAVE EXPERIENCE
export async function saveExperienceAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });
  if (!user?.profile) throw new Error("Profile not found");

  const id = formData.get("id") as string | null;
  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const employmentType = (formData.get("employmentType") as string) || "Full-time";
  const location = (formData.get("location") as string) || null;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = (formData.get("endDate") as string) || null;
  const isCurrent = formData.get("isCurrent") === "true";
  const description = (formData.get("description") as string) || null;

  const data = {
    company,
    position,
    employmentType,
    location,
    startDate: new Date(startDateStr),
    endDate: isCurrent || !endDateStr ? null : new Date(endDateStr),
    isCurrent,
    description,
  };

  if (id) {
    await prisma.experience.update({ where: { id }, data });
  } else {
    await prisma.experience.create({
      data: { ...data, profileId: user.profile.id },
    });
  }

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  return { success: true };
}

// 2. SAVE PROJECT
// SAVE PROJECT (CREATE / UPDATE)
export async function saveProjectAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });
  if (!user?.profile) throw new Error("Profile not found");

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const technologies = (formData.get("technologies") as string) || null;
  const link = (formData.get("link") as string) || null;
  const githubUrl = (formData.get("githubUrl") as string) || null;
  const startDateStr = (formData.get("startDate") as string) || null;
  const endDateStr = (formData.get("endDate") as string) || null;

  const data = {
    title,
    description,
    technologies,
    link,
    githubUrl,
    startDate: startDateStr ? new Date(startDateStr) : null,
    endDate: endDateStr ? new Date(endDateStr) : null,
  };

  if (id) {
    await prisma.project.update({ where: { id }, data });
  } else {
    await prisma.project.create({
      data: { ...data, profileId: user.profile.id },
    });
  }

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  return { success: true };
}

// 3. SAVE EDUCATION
export async function saveEducationAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });
  if (!user?.profile) throw new Error("Profile not found");

  const id = formData.get("id") as string | null;
  const institution = formData.get("institution") as string;
  const degree = formData.get("degree") as string;
  const fieldOfStudy = formData.get("fieldOfStudy") as string;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = (formData.get("endDate") as string) || null;
  const description = (formData.get("description") as string) || null;

  const data = {
    institution,
    degree,
    fieldOfStudy,
    startDate: new Date(startDateStr),
    endDate: endDateStr ? new Date(endDateStr) : null,
    description,
  };

  if (id) {
    await prisma.education.update({ where: { id }, data });
  } else {
    await prisma.education.create({
      data: { ...data, profileId: user.profile.id },
    });
  }

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  return { success: true };
}

// 4. SAVE ACHIEVEMENT
export async function saveAchievementAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });
  if (!user?.profile) throw new Error("Profile not found");

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const issuer = (formData.get("issuer") as string) || null;
  const dateStr = (formData.get("date") as string) || null;
  const description = (formData.get("description") as string) || null;

  const data = {
    title,
    issuer,
    date: dateStr ? new Date(dateStr) : null,
    description,
  };

  if (id) {
    await prisma.achievement.update({ where: { id }, data });
  } else {
    await prisma.achievement.create({
      data: { ...data, profileId: user.profile.id },
    });
  }

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  return { success: true };
}

// 5. SAVE CERTIFICATION
export async function saveCertificationAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });
  if (!user?.profile) throw new Error("Profile not found");

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const issuer = formData.get("issuer") as string;
  const issueDateStr = formData.get("issueDate") as string;
  const expiryDateStr = (formData.get("expiryDate") as string) || null;
  const credentialUrl = (formData.get("credentialUrl") as string) || null;

  const data = {
    name,
    issuer,
    issueDate: new Date(issueDateStr),
    expiryDate: expiryDateStr ? new Date(expiryDateStr) : null,
    credentialUrl,
  };

  if (id) {
    await prisma.certification.update({ where: { id }, data });
  } else {
    await prisma.certification.create({
      data: { ...data, profileId: user.profile.id },
    });
  }

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  return { success: true };
}

// 6. ADD SKILL
export async function addSkillAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });
  if (!user?.profile) throw new Error("Profile not found");

  const name = formData.get("name") as string;
  const level = (formData.get("level") as string) || "INTERMEDIATE";

  if (!name.trim()) throw new Error("Nama skill tidak boleh kosong");

  await prisma.skill.create({
    data: {
      profileId: user.profile.id,
      name: name.trim(),
      level,
    },
  });

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  return { success: true };
}

// 7. DELETE RECORD
export async function deleteRecordAction(
  type: "exp" | "proj" | "edu" | "skill" | "achieve" | "cert",
  id: string
) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  if (type === "exp") await prisma.experience.delete({ where: { id } });
  if (type === "proj") await prisma.project.delete({ where: { id } });
  if (type === "edu") await prisma.education.delete({ where: { id } });
  if (type === "skill") await prisma.skill.delete({ where: { id } });
  if (type === "achieve") await prisma.achievement.delete({ where: { id } });
  if (type === "cert") await prisma.certification.delete({ where: { id } });

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  return { success: true };
}

// 8. UPDATE GENERAL SETTINGS (INDUSTRY & HEADLINE)
export async function updateProfileGeneralAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });
  if (!user?.profile) throw new Error("Profile not found");

  const industry = (formData.get("industry") as string) || "Information Technology & Software";
  const headline = (formData.get("headline") as string) || null;

  await prisma.profile.update({
    where: { id: user.profile.id },
    data: {
      industry,
      headline,
    },
  });

  revalidatePath("/career-profile");
  revalidatePath("/dashboard");
  revalidatePath("/cv-builder");
  return { success: true };
}

// 9. UPDATE PERSONAL INFORMATION & CONTACTS
export async function updatePersonalInfoAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const location = formData.get("location") as string;
  const linkedinUrl = formData.get("linkedinUrl") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const bio = formData.get("bio") as string;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });

    if (!user) return { success: false, error: "User not found" };

    if (name && name !== user.name) {
      await prisma.user.update({
        where: { id: user.id },
        data: { name },
      });
    }

    await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        phone,
        location,
        linkedinUrl,
        githubUrl,
        bio,
      },
      create: {
        userId: user.id,
        phone,
        location,
        linkedinUrl,
        githubUrl,
        bio,
      },
    });

    revalidatePath("/career-profile");
    revalidatePath("/dashboard");
    revalidatePath("/cv-builder");

    return { success: true };
  } catch (error: any) {
    console.error("[Update Personal Info Error]:", error);
    return { success: false, error: error.message || "Gagal menyimpan data." };
  }
}