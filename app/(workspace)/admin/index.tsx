import { ModuleOverview } from "@/components/dashboard/ModuleOverview";
import { roleLabels, rolePermissions } from "@/lib/permissions";
import React from "react";

export default function AdminRoute() {
  return (
    <ModuleOverview
      title="Roles & Permissions"
      subtitle="Enterprise RBAC with tenant-scoped roles, module permissions, approval authority, and read-only audit access."
      metrics={[
        { label: "Roles", value: String(Object.keys(roleLabels).length), tone: "blue" },
        { label: "Permissions", value: "70", tone: "emerald" },
        { label: "Auditors", value: "4", tone: "slate" },
      ]}
      rows={Object.entries(roleLabels).map(([role, label]) => ({
        name: label,
        key: role,
        permissions: rolePermissions[role as keyof typeof rolePermissions].length,
        scope: role === "SUPER_ADMIN" ? "Platform" : "Tenant",
      }))}
    />
  );
}

