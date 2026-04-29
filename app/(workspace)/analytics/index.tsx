import { ModuleOverview } from "@/components/dashboard/ModuleOverview";
import React from "react";

export default function AnalyticsRoute() {
  return (
    <ModuleOverview
      title="Analytics Center"
      subtitle="Business intelligence for company performance, people operations, finance trends, fleet risk, and operating efficiency."
      metrics={[
        { label: "Insights", value: "34", tone: "blue" },
        { label: "Forecast", value: "+9.4%", tone: "emerald" },
        { label: "Risk alerts", value: "8", tone: "amber" },
      ]}
      rows={[
        { item: "Revenue forecast", company: "Group consolidated", trend: "+9.4%", status: "Healthy" },
        { item: "Fleet cost anomaly", company: "KFM", trend: "+18%", status: "Investigate" },
        { item: "Hiring velocity", company: "KFS", trend: "+6 roles", status: "On track" },
      ]}
    />
  );
}

