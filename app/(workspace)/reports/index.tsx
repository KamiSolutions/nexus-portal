import { ModuleOverview } from "@/components/dashboard/ModuleOverview";
import React from "react";

export default function ReportsRoute() {
  return (
    <ModuleOverview
      title="Reports"
      subtitle="Board packs, operating reports, exports, PDF generation, saved views, and audit-ready reporting."
      metrics={[
        { label: "Saved", value: "18", tone: "blue" },
        { label: "Scheduled", value: "6", tone: "emerald" },
        { label: "Exports", value: "41", tone: "slate" },
      ]}
      rows={[
        { item: "Monthly board pack", owner: "Group Admin", cadence: "Monthly", status: "Scheduled" },
        { item: "Fleet maintenance report", owner: "Fleet Manager", cadence: "Weekly", status: "Ready" },
        { item: "Finance approvals audit", owner: "Auditor", cadence: "Ad hoc", status: "Draft" },
      ]}
    />
  );
}

