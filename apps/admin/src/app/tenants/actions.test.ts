import { describe, it, expect, vi } from "vitest";
import { createTenant } from "./actions";

// Mock del PrismaClient e del modulo revalidatePath
vi.mock("@dataweave/database", () => ({
  prisma: {
    tenant: {
      create: vi.fn().mockResolvedValue({
        id: "mock_id",
        name: "Acme Corp",
        subscriptionStatus: "TRIAL",
        aiTokenUsage: 0,
      }),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("Tenant Server Actions", () => {
  it("deve restituire un errore se il nome è vuoto", async () => {
    const formData = new FormData();
    formData.append("name", "   ");

    const result = await createTenant(formData);

    expect(result.error).toBe("Name is required");
    expect(result.success).toBeUndefined();
  });

  it("deve creare correttamente il tenant e revalidare la cache", async () => {
    const formData = new FormData();
    formData.append("name", "Acme Corp");

    const result = await createTenant(formData);

    expect(result.success).toBe(true);
    expect(result.tenant?.name).toBe("Acme Corp");
    
    const { prisma } = await import("@dataweave/database");
    expect(prisma.tenant.create).toHaveBeenCalledWith({
      data: {
        name: "Acme Corp",
        subscriptionStatus: "TRIAL",
        aiTokenUsage: 0,
      },
    });

    const { revalidatePath } = await import("next/cache");
    expect(revalidatePath).toHaveBeenCalledWith("/tenants");
  });
});
