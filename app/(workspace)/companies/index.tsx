import { ModuleOverview } from "@/components/dashboard/ModuleOverview";
import { useTenant } from "@/providers/TenantProvider";
import React from "react";

export default function CompaniesRoute() {
  const { companies } = useTenant();

  return (
    <ModuleOverview
      title="Company Management"
      subtitle="Manage subsidiary structure, legal profiles, company documents, status, and workspace-level branding."
      metrics={[
        { label: "Companies", value: String(companies.length), tone: "blue" },
        { label: "Active", value: String(companies.filter((company) => company.status === "active").length), tone: "emerald" },
        { label: "Trial", value: String(companies.filter((company) => company.status === "trial").length), tone: "amber" },
      ]}
      rows={companies.map((company) => ({
        name: company.name,
        legalName: company.legalName,
        industry: company.industry,
        employees: company.employeeCount,
        status: company.status,
      }))}
    />
  );
}

