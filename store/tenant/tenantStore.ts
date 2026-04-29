export type TenantState = {
  tenantId: string;
  activeCompanyId: string;
};

export const initialTenantState: TenantState = {
  tenantId: "tenant-summit-group",
  activeCompanyId: "group-hq",
};

