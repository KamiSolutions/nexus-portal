import type { EnterpriseRole } from "@/lib/permissions";
import { setErrorTrackingUser, clearErrorTrackingUser } from "@/lib/error-tracking";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

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
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<EnterpriseRole>("GROUP_ADMIN");
  const [user] = useState<SaaSUser>({
    id: "usr-amara",
    name: "Amara Mokoena",
    email: "amara@summitlife.example",
    role: "GROUP_ADMIN",
    companyIds: ["group-hq", "kfs", "kfm", "summit-life"],
  });

  // Sync user to error tracking
  useEffect(() => {
    setErrorTrackingUser(user.id, user.email);
  }, [user.id, user.email]);

  // Handle unauthorized events from API client
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleUnauthorized = () => {
      console.warn("[Auth] User session expired - logging out");
      // Trigger logout or redirect to login
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Clear error tracking user
      await clearErrorTrackingUser();
      // Clear auth token
      const { clearAuthToken } = await import("@/lib/api-client");
      await clearAuthToken();
    } catch (error) {
      console.error("[Auth] Error during logout:", error);
    }
  };

  const value = useMemo(
    () => ({
      user: {
        ...user,
        role,
      },
      isSignedIn: true,
      setRole,
      logout: handleLogout,
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

