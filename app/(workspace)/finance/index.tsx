import { ModuleOverview } from "@/components/dashboard/ModuleOverview";
import React from "react";

export default function FinanceRoute() {
  return (
    <ModuleOverview
      title="Finance Operations"
      subtitle="Financial requisitions, loans, approvals, budgets, exports, audit trails, and approval pipelines."
      metrics={[
        { label: "Pending", value: "18", tone: "amber" },
        { label: "Approved MTD", value: "R4.8M", tone: "emerald" },
        { label: "Avg cycle", value: "1.8 days", tone: "blue" },
      ]}
      rows={[
        { item: "Office expansion capex", company: "Group HQ", amount: "R1.2M", status: "Review" },
        { item: "Vehicle service batch", company: "KFM", amount: "R186k", status: "Pending" },
        { item: "Payroll loan request", company: "KFS", amount: "R42k", status: "Approved" },
      ]}
    />
  );
}

