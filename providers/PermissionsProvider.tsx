import { useAuth } from "@/providers/AuthProvider";
import { can, rolePermissions, type Permission } from "@/lib/permissions";
import React, { createContext, useContext, useMemo } from "react";

type PermissionsContextValue = {
  permissions: Permission[];
  canAccess: (permission: Permission) => boolean;
};

const PermissionsContext = createContext<PermissionsContextValue | null>(null);

export function PermissionsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const value = useMemo(
    () => ({
      permissions: rolePermissions[user.role],
      canAccess: (permission: Permission) => can(user.role, permission),
    }),
    [user.role],
  );

  return <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>;
}

export function usePermissions() {
  const context = useContext(PermissionsContext);

  if (!context) {
    throw new Error("usePermissions must be used inside PermissionsProvider");
  }

  return context;
}

