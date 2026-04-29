import { ModuleOverview } from "@/components/dashboard/ModuleOverview";
import React from "react";

export default function LeasesRoute() {
  return (
    <ModuleOverview
      title="Lease Portfolio"
      subtitle="Property agreements, renewal dates, contract documents, payment schedules, and portfolio exposure."
      metrics={[
        { label: "Properties", value: "9", tone: "blue" },
        { label: "Expiring", value: "3", tone: "amber" },
        { label: "Monthly rent", value: "R680k", tone: "emerald" },
      ]}
      rows={[
        { name: "Premier Plaza", location: "Johannesburg", endDate: "31 Dec 2026", status: "Active" },
        { name: "Nexus Business Centre", location: "Cape Town", endDate: "30 Jun 2027", status: "Active" },
        { name: "Riverside Towers", location: "Durban", endDate: "Pending", status: "Review" },
      ]}
    />
  );
}

