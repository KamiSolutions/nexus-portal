import type { EnterpriseRole } from "@/lib/permissions";

export type AuthState = {
  userId: string | null;
  role: EnterpriseRole;
};

export const initialAuthState: AuthState = {
  userId: "usr-amara",
  role: "GROUP_ADMIN",
};

