"use server";

import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAccountProfileAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const headline = formData.get("headline") as string;
  const bio = formData.get("bio") as string;
  const location = formData.get("location") as string;
  const industry = formData.get("industry") as string;

  try {
    // Update User Name
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    });

    // Upsert Profile Information
    await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        headline,
        bio,
        location,
        industry,
      },
      create: {
        userId: session.user.id,
        headline,
        bio,
        location,
        industry: industry || "Information Technology & Software",
      },
    });

    revalidatePath("/settings");
    revalidatePath("/career-profile");
    revalidatePath("/cv-builder");
    return { success: true };
  } catch (error: any) {
    console.error("[UPDATE_SETTINGS_ERROR]:", error);
    return { success: false, error: "Gagal memperbarui pengaturan profil." };
  }
}

export async function deleteUserAccountAction() {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Hapus data pengguna (relasi cascade akan menghapus profile, experiences, skills, dll)
    await prisma.user.delete({
      where: { id: session.user.id },
    });

    return { success: true };
  } catch (error: any) {
    console.error("[DELETE_ACCOUNT_ERROR]:", error);
    return { success: false, error: "Gagal menghapus akun. Silakan coba lagi." };
  }
}