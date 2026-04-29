import { ModuleOverview } from "@/components/dashboard/ModuleOverview";
import React from "react";

export default function SettingsRoute() {
  return (
    <ModuleOverview
      title="Workspace Settings"
      subtitle="Company branding, tenant security, integrations, notification preferences, API keys, and data residency."
      metrics={[
        { label: "Integrations", value: "5", tone: "blue" },
        { label: "Security", value: "SAML ready", tone: "emerald" },
        { label: "Data region", value: "Africa", tone: "slate" },
      ]}
      rows={[
        { item: "Accounting integration", provider: "Xero", scope: "Finance", status: "Connected" },
        { item: "Cloud storage", provider: "SharePoint", scope: "Documents", status: "Pending" },
        { item: "Email alerts", provider: "Microsoft 365", scope: "Notifications", status: "Connected" },
      ]}
    />
  );
}

