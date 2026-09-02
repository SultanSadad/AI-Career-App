"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Update Informasi Dasar Profil
export async function updateGeneralInfoAction(data: {
  headline?: string;
  location?: string;
  phone?: string;
  bio?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
}) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });

  if (!user?.profile) throw new Error("Profile not found");

  await prisma.profile.update({
    where: { id: user.profile.id },
    data: {
      headline: data.headline,
      location: data.location,
      phone: data.phone,
      bio: data.bio,
      linkedinUrl: data.linkedinUrl,
      githubUrl: data.githubUrl,
      portfolioUrl: data.portfolioUrl,
    },
  });

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  return { success: true };
}

// 2. Project Actions (Add & Delete)
export async function addProjectAction(data: {
  title: string;
  technologies?: string;
  description: string;
}) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });

  if (!user?.profile) throw new Error("Profile not found");

  const newProj = await prisma.project.create({
    data: {
      profileId: user.profile.id,
      title: data.title,
      technologies: data.technologies,
      description: data.description,
    },
  });

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  return newProj;
}

export async function deleteProjectAction(projectId: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  await prisma.project.delete({
    where: { id: projectId },
  });

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  return { success: true };
}

// 3. Skill Actions (Add & Delete)
export async function addSkillAction(name: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });

  if (!user?.profile) throw new Error("Profile not found");

  const newSkill = await prisma.skill.create({
    data: {
      profileId: user.profile.id,
      name,
    },
  });

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  return newSkill;
}

export async function deleteSkillAction(skillId: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  await prisma.skill.delete({
    where: { id: skillId },
  });

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  return { success: true };
}

// 4. Experience Action (Delete)
export async function deleteExperienceAction(expId: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  await prisma.experience.delete({
    where: { id: expId },
  });

  revalidatePath("/career-profile");
  revalidatePath("/cv-builder");
  revalidatePath("/dashboard");
  return { success: true };
}