"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Helper internal untuk mendapatkan user & profile yang valid dari session
async function getAuthenticatedUserWithProfile() {
  const session = await auth();
  if (!session?.user?.id && !session?.user?.email) {
    throw new Error("Unauthorized");
  }

  let user = await prisma.user.findFirst({
    where: {
      OR: [
        ...(session.user.id ? [{ id: session.user.id }] : []),
        ...(session.user.email ? [{ email: session.user.email }] : []),
      ],
    },
    include: { profile: true },
  });

  if (!user) throw new Error("User not found");

  // Jika profile belum ada, buatkan otomatis
  if (!user.profile) {
    const newProfile = await prisma.profile.create({
      data: {
        userId: user.id,
        industry: "it",
      },
    });
    user = { ...user, profile: newProfile };
  }

  return user;
}

// 1. UPDATE PERSONAL & GENERAL INFO (MENYIMPAN MAJOR/INDUSTRY DENGAN AMAN)
export async function updatePersonalInfoAction(payload: any) {
  try {
    const user = await getAuthenticatedUserWithProfile();

    // Mendukung input berupa FormData maupun Plain Object
    const data = payload instanceof FormData ? Object.fromEntries(payload) : payload;

    const name = typeof data.name === "string" ? data.name.trim() : undefined;
    const industry = data.industry || data.major || undefined;
    const contactEmail = data.contactEmail || null;
    const headline = data.headline || null;
    const phone = data.phone || null;
    const location = data.location || null;
    const linkedinUrl = data.linkedinUrl || null;
    const githubUrl = data.githubUrl || null;
    const bio = data.bio || null;

    // Update nama user jika berbeda
    if (name && name !== user.name) {
      await prisma.user.update({
        where: { id: user.id },
        data: { name },
      });
    }

    // Update data profile termasuk industry/major
    await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        ...(industry ? { industry } : {}),
        contactEmail,
        headline,
        phone,
        location,
        linkedinUrl,
        githubUrl,
        bio,
      },
      create: {
        userId: user.id,
        industry: industry || "it",
        contactEmail,
        headline,
        phone,
        location,
        linkedinUrl,
        githubUrl,
        bio,
      },
    });

    // Revalidasi semua halaman yang bergantung pada profile data
    revalidatePath("/career-profile");
    revalidatePath("/cv-builder");
    revalidatePath("/dashboard");
    revalidatePath("/ai-insight");

    return { success: true };
  } catch (error: any) {
    console.error("[Update Personal Info Error]:", error);
    return { success: false, error: error.message || "Gagal menyimpan data." };
  }
}

// 2. SAVE EXPERIENCE (CREATE & UPDATE)
export async function saveExperienceAction(formData: FormData) {
  const user = await getAuthenticatedUserWithProfile();

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
      data: { ...data, profileId: user.profile!.id },
    });
  }

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  revalidatePath("/ai-insight");
  return { success: true };
}

// 3. SAVE PROJECT (CREATE & UPDATE)
export async function saveProjectAction(formData: FormData) {
  const user = await getAuthenticatedUserWithProfile();

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
      data: { ...data, profileId: user.profile!.id },
    });
  }

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  revalidatePath("/ai-insight");
  return { success: true };
}

// 4. SAVE EDUCATION (CREATE & UPDATE)
export async function saveEducationAction(formData: FormData) {
  const user = await getAuthenticatedUserWithProfile();

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
      data: { ...data, profileId: user.profile!.id },
    });
  }

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  revalidatePath("/ai-insight");
  return { success: true };
}

// 5. ADD SKILL
export async function addSkillAction(formData: FormData) {
  const user = await getAuthenticatedUserWithProfile();

  const name = formData.get("name") as string;
  const level = (formData.get("level") as string) || "INTERMEDIATE";

  if (!name?.trim()) throw new Error("Nama skill tidak boleh kosong");

  await prisma.skill.create({
    data: {
      profileId: user.profile!.id,
      name: name.trim(),
      level,
    },
  });

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  revalidatePath("/ai-insight");
  return { success: true };
}

// 6. DELETE RECORD
export async function deleteRecordAction(
  type: "exp" | "proj" | "edu" | "skill" | "achieve" | "cert",
  id: string
) {
  const user = await getAuthenticatedUserWithProfile();

  if (type === "exp") await prisma.experience.delete({ where: { id } });
  if (type === "proj") await prisma.project.delete({ where: { id } });
  if (type === "edu") await prisma.education.delete({ where: { id } });
  if (type === "skill") await prisma.skill.delete({ where: { id } });
  if (type === "achieve") await prisma.achievement.delete({ where: { id } });
  if (type === "cert") await prisma.certification.delete({ where: { id } });

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  revalidatePath("/ai-insight");
  return { success: true };
}