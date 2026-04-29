import { ModuleOverview } from "@/components/dashboard/ModuleOverview";
import React from "react";

export default function HRRoute() {
  return (
    <ModuleOverview
      title="HR Workspace"
      subtitle="Leave workflows, employee contracts, onboarding, policy acknowledgement, and workforce analytics."
      metrics={[
        { label: "Leave requests", value: "12", tone: "amber" },
        { label: "Contracts", value: "47", tone: "blue" },
        { label: "Onboarding", value: "9", tone: "emerald" },
      ]}
      rows={[
        { item: "Annual leave", employee: "Naledi Dube", company: "KFS", status: "Pending" },
        { item: "Contract renewal", employee: "Aviwe Maseko", company: "Group HQ", status: "Due soon" },
        { item: "Policy acknowledgement", employee: "Team Ops", company: "KFM", status: "88%" },
      ]}
    />
  );
}

