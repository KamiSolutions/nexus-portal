export type EnterpriseRole =
  | "SUPER_ADMIN"
  | "GROUP_ADMIN"
  | "COMPANY_ADMIN"
  | "FINANCE_MANAGER"
  | "HR_MANAGER"
  | "FLEET_MANAGER"
  | "CLAIMS_OFFICER"
  | "TEAM_LEAD"
  | "EMPLOYEE"
  | "AUDITOR";

export type PermissionAction = "view" | "create" | "approve" | "manage" | "export";

export type PermissionModule =
  | "dashboard"
  | "companies"
  | "employees"
  | "finance"
  | "hr"
  | "vehicles"
  | "leases"
  | "policies"
  | "claims"
  | "analytics"
  | "reports"
  | "billing"
  | "settings"
  | "admin";

export type Permission = `${PermissionModule}:${PermissionAction}`;

export const roleLabels: Record<EnterpriseRole, string> = {
  SUPER_ADMIN: "Super Admin",
  GROUP_ADMIN: "Group Admin",
  COMPANY_ADMIN: "Company Admin",
  FINANCE_MANAGER: "Finance Manager",
  HR_MANAGER: "HR Manager",
  FLEET_MANAGER: "Fleet Manager",
  CLAIMS_OFFICER: "Claims Officer",
  TEAM_LEAD: "Team Lead",
  EMPLOYEE: "Employee",
  AUDITOR: "Read-only Auditor",
};

const allModules: PermissionModule[] = [
  "dashboard",
  "companies",
  "employees",
  "finance",
  "hr",
  "vehicles",
  "leases",
  "policies",
  "claims",
  "analytics",
  "reports",
  "billing",
  "settings",
  "admin",
];

const allActions: PermissionAction[] = ["view", "create", "approve", "manage", "export"];

const fullAccess = allModules.flatMap((module) =>
  allActions.map((action) => `${module}:${action}` as Permission),
);

export const rolePermissions: Record<EnterpriseRole, Permission[]> = {
  SUPER_ADMIN: fullAccess,
  GROUP_ADMIN: fullAccess.filter((permission) => !permission.startsWith("billing:manage")),
  COMPANY_ADMIN: [
    "dashboard:view",
    "companies:view",
    "employees:view",
    "employees:create",
    "employees:manage",
    "finance:view",
    "finance:approve",
    "hr:view",
    "hr:approve",
    "vehicles:view",
    "vehicles:manage",
    "leases:view",
    "policies:view",
    "claims:view",
    "analytics:view",
    "reports:view",
    "settings:view",
  ],
  FINANCE_MANAGER: [
    "dashboard:view",
    "finance:view",
    "finance:create",
    "finance:approve",
    "finance:export",
    "analytics:view",
    "reports:view",
  ],
  HR_MANAGER: [
    "dashboard:view",
    "employees:view",
    "employees:create",
    "hr:view",
    "hr:create",
    "hr:approve",
    "reports:view",
  ],
  FLEET_MANAGER: [
    "dashboard:view",
    "vehicles:view",
    "vehicles:create",
    "vehicles:manage",
    "reports:view",
  ],
  CLAIMS_OFFICER: ["dashboard:view", "policies:view", "claims:view", "claims:create", "claims:approve"],
  TEAM_LEAD: ["dashboard:view", "employees:view", "hr:view", "finance:view", "finance:create"],
  EMPLOYEE: ["dashboard:view", "hr:view", "hr:create", "claims:view", "claims:create"],
  AUDITOR: allModules.map((module) => `${module}:view` as Permission),
};

export function can(role: EnterpriseRole, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

