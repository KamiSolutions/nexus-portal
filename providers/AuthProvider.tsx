import type { EnterpriseRole } from "@/lib/permissions";
import React, { createContext, useContext, useMemo, useState } from "react";

type SaaSUser = {
  id: string;
  name: string;
  email: string;
  role: EnterpriseRole;
  companyIds: string[];
};

type AuthContextValue = {
  user: SaaSUser;
  isSignedIn: boolean;
  setRole: (role: EnterpriseRole) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<EnterpriseRole>("GROUP_ADMIN");

  const value = useMemo(
    () => ({
      user: {
        id: "usr-amara",
        name: "Amara Mokoena",
        email: "amara@summitlife.example",
        role,
        companyIds: ["group-hq", "kfs", "kfm", "summit-life"],
      },
      isSignedIn: true,
      setRole,
    }),
    [role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

