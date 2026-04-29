export type TenantStatus = "active" | "trial" | "suspended";

export type CompanyWorkspace = {
  id: string;
  tenantId: string;
  name: string;
  legalName: string;
  type: "group" | "subsidiary";
  industry: string;
  country: string;
  status: TenantStatus;
  brandColor: string;
  employeeCount: number;
  monthlyRevenue: number;
  parentCompanyId?: string;
};

export type Tenant = {
  id: string;
  groupName: string;
  primaryDomain: string;
  plan: "trial" | "growth" | "enterprise";
  dataRegion: "af-south-1" | "eu-west-1" | "us-east-1";
  companies: CompanyWorkspace[];
};

export const demoTenant: Tenant = {
  id: "tenant-nexus-group",
  groupName: "Nexus Life Group",
  primaryDomain: "nexus.example",
  plan: "enterprise",
  dataRegion: "af-south-1",
  companies: [
    {
      id: "group-hq",
      tenantId: "tenant-summit-group",
      name: "Group HQ",
      legalName: "Nexus Group Holdings",
      type: "group",
      industry: "Holding Company",
      country: "South Africa",
      status: "active",
      brandColor: "#2563eb",
      employeeCount: 42,
      monthlyRevenue: 18600000,
    },
    {
      id: "kfs",
      tenantId: "tenant-nexus-group",
      name: "Kami Financial Services",
      legalName: "Kami Financial Services (Pty) Ltd",
      type: "subsidiary",
      industry: "Financial Services",
      country: "South Africa",
      status: "active",
      brandColor: "#0f766e",
      employeeCount: 118,
      monthlyRevenue: 12800000,
      parentCompanyId: "group-hq",
    },
    {
      id: "kfm",
      tenantId: "tenant-nexus-group",
      name: "Kami Fleet Management",
      legalName: "Kami Fleet Management (Pty) Ltd",
      type: "subsidiary",
      industry: "Logistics",
      country: "South Africa",
      status: "active",
      brandColor: "#7c3aed",
      employeeCount: 76,
      monthlyRevenue: 7400000,
      parentCompanyId: "group-hq",
    },
    {
      id: "summit-life",
      tenantId: "tenant-nexus-group",
      name: "Nexus Life Operations",
      legalName: "Nexus Life Operations (Pty) Ltd",
      type: "subsidiary",
      industry: "Operations",
      country: "South Africa",
      status: "trial",
      brandColor: "#d97706",
      employeeCount: 54,
      monthlyRevenue: 5100000,
      parentCompanyId: "group-hq",
    },
  ],
};

export function getCompanyById(companyId: string) {
  return demoTenant.companies.find((company) => company.id === companyId);
}
