"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. SAVE EXPERIENCE (CREATE / UPDATE)
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
  const location = (formData.get("location") as string) || null;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = (formData.get("endDate") as string) || null;
  const isCurrent = formData.get("isCurrent") === "true";
  const description = (formData.get("description") as string) || null;

  const data = {
    company,
    position,
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
  return { success: true };
}

// 2. SAVE PROJECT (CREATE / UPDATE)
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
  const link = (formData.get("link") as string) || null;

  if (id) {
    await prisma.project.update({
      where: { id },
      data: { title, description, link },
    });
  } else {
    await prisma.project.create({
      data: { profileId: user.profile.id, title, description, link },
    });
  }

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  return { success: true };
}

// 3. SAVE EDUCATION (CREATE / UPDATE)
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

  const data = {
    institution,
    degree,
    fieldOfStudy,
    startDate: new Date(startDateStr),
    endDate: endDateStr ? new Date(endDateStr) : null,
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
  return { success: true };
}

// 4. SAVE ACHIEVEMENT (CREATE / UPDATE)
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
  return { success: true };
}

// 5. ADD SKILL
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
  return { success: true };
}

// 6. DELETE RECORD
export async function deleteRecordAction(
  type: "exp" | "proj" | "edu" | "skill" | "achieve",
  id: string
) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  if (type === "exp") await prisma.experience.delete({ where: { id } });
  if (type === "proj") await prisma.project.delete({ where: { id } });
  if (type === "edu") await prisma.education.delete({ where: { id } });
  if (type === "skill") await prisma.skill.delete({ where: { id } });
  if (type === "achieve") await prisma.achievement.delete({ where: { id } });

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  return { success: true };
}


// Tambahkan di app/actions/career-profile.ts

export async function updateProfileGeneralAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });
  if (!user?.profile) throw new Error("Profile not found");

  const industry = (formData.get("industry") as string) || "Information Technology";
  const headline = (formData.get("headline") as string) || null;
  const phone = (formData.get("phone") as string) || null;
  const linkedin = (formData.get("linkedin") as string) || null;
  const github = (formData.get("github") as string) || null;

  await prisma.profile.update({
    where: { id: user.profile.id },
    data: {
      industry,
      headline,
      phone,
      linkedin,
      github,
    },
  });

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  return { success: true };
}