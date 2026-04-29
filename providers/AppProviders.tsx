import { AuthProvider } from "@/providers/AuthProvider";
import { PermissionsProvider } from "@/providers/PermissionsProvider";
import { TenantProvider } from "@/providers/TenantProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { WorkspaceProvider } from "@/providers/WorkspaceProvider";
import React from "react";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TenantProvider>
          <PermissionsProvider>
            <WorkspaceProvider>{children}</WorkspaceProvider>
          </PermissionsProvider>
        </TenantProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

