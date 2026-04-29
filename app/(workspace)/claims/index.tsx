import { ModuleOverview } from "@/components/dashboard/ModuleOverview";
import React from "react";

export default function ClaimsRoute() {
  return (
    <ModuleOverview
      title="Claims Center"
      subtitle="Claims submission, adjuster assignment, approval workflows, settlements, and compliance notes."
      metrics={[
        { label: "Open", value: "11", tone: "amber" },
        { label: "Settled MTD", value: "R810k", tone: "emerald" },
        { label: "SLA", value: "93%", tone: "blue" },
      ]}
      rows={[
        { item: "CLM-2026-041", policy: "Fleet insurance", amount: "R64k", status: "Under review" },
        { item: "CLM-2026-038", policy: "Property cover", amount: "R210k", status: "Approved" },
        { item: "CLM-2026-029", policy: "Equipment", amount: "R33k", status: "Settled" },
      ]}
    />
  );
}

