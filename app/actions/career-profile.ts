"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function getProfileId(userId: string) {
  let profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        userId,
        headline: "Professional",
      },
    });
  }

  return profile.id;
}

export async function addExperienceAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const profileId = await getProfileId(session.user.id);

  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const location = formData.get("location") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDateRaw = formData.get("endDate") as string;
  const isCurrent = formData.get("isCurrent") === "on";
  const description = formData.get("description") as string;

  await prisma.experience.create({
    data: {
      profileId,
      company,
      position,
      location,
      startDate,
      endDate: isCurrent || !endDateRaw ? null : new Date(endDateRaw),
      isCurrent,
      description,
    },
  });

  revalidatePath("/career-profile");
  return { success: true };
}

export async function addProjectAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const profileId = await getProfileId(session.user.id);

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const link = formData.get("link") as string;

  await prisma.project.create({
    data: {
      profileId,
      title,
      description,
      link: link || null,
    },
  });

  revalidatePath("/career-profile");
  return { success: true };
}

export async function addSkillAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const profileId = await getProfileId(session.user.id);
  const name = formData.get("name") as string;
  const level = formData.get("level") as string;

  await prisma.skill.create({
    data: {
      profileId,
      name,
      level: level || "Advanced",
    },
  });

  revalidatePath("/career-profile");
  return { success: true };
}

export async function addEducationAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const profileId = await getProfileId(session.user.id);

  const institution = formData.get("institution") as string;
  const degree = formData.get("degree") as string;
  const fieldOfStudy = formData.get("fieldOfStudy") as string;
  const startDate = new Date(formData.get("startDate") as string);

  await prisma.education.create({
    data: {
      profileId,
      institution,
      degree,
      fieldOfStudy,
      startDate,
    },
  });

  revalidatePath("/career-profile");
  return { success: true };
}