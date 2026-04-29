import { ModuleOverview } from "@/components/dashboard/ModuleOverview";
import React from "react";

export default function BillingRoute() {
  return (
    <ModuleOverview
      title="Subscription & Billing"
      subtitle="Plan management, trials, invoices, usage limits, workspace billing, and enterprise licensing controls."
      metrics={[
        { label: "Plan", value: "Enterprise", tone: "blue" },
        { label: "Seats", value: "290 / 500", tone: "emerald" },
        { label: "Next invoice", value: "R84k", tone: "slate" },
      ]}
      rows={[
        { item: "Enterprise platform", quantity: "1 tenant", amount: "R55k", status: "Active" },
        { item: "Additional seats", quantity: "290", amount: "R29k", status: "Active" },
        { item: "AI analytics add-on", quantity: "1", amount: "Trial", status: "Trial" },
      ]}
    />
  );
}

