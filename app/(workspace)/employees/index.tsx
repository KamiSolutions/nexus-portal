import { ModuleOverview } from "@/components/dashboard/ModuleOverview";
import React from "react";

export default function EmployeesRoute() {
  return (
    <ModuleOverview
      title="Employees & Access"
      subtitle="A tenant-scoped employee directory with HR records, access levels, reporting lines, and company-level permissions."
      metrics={[
        { label: "Employees", value: "290", tone: "blue" },
        { label: "Department heads", value: "18", tone: "emerald" },
        { label: "Access reviews", value: "7", tone: "amber" },
      ]}
      rows={[
        { name: "John Moyo", department: "Human Resources", role: "HR Manager", workspace: "Group HQ" },
        { name: "Sarah Ncube", department: "Finance", role: "Finance Manager", workspace: "KFS" },
        { name: "Peter Dlamini", department: "Logistics", role: "Fleet Manager", workspace: "KFM" },
        { name: "Linda Khumalo", department: "Operations", role: "Company Admin", workspace: "Summit Life" },
      ]}
    />
  );
}

