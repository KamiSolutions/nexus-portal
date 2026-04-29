import type { EnterpriseRole } from "@/lib/permissions";

export type AuthSession = {
  userId: string;
  tenantId: string;
  role: EnterpriseRole;
};

export async function getDemoSession(): Promise<AuthSession> {
  return {
    userId: "usr-amara",
    tenantId: "tenant-summit-group",
    role: "GROUP_ADMIN",
  };
}

