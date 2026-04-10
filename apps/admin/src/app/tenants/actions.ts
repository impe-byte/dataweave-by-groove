"use server";

import { prisma } from "@dataweave/database";
import { revalidatePath } from "next/cache";

export async function createTenant(formData: FormData) {
  const name = formData.get("name") as string;
  
  if (!name || name.trim() === "") {
    return { error: "Name is required" };
  }

  try {
    const tenant = await prisma.tenant.create({
      data: {
        name: name.trim(),
        subscriptionStatus: "TRIAL",
        aiTokenUsage: 0,
      },
    });

    revalidatePath("/tenants");
    return { success: true, tenant };
  } catch (error) {
    console.error("Error creating tenant:", error);
    return { error: "Failed to create tenant" };
  }
}
