import { ModuleOverview } from "@/components/dashboard/ModuleOverview";
import React from "react";

export default function NotificationsRoute() {
  return (
    <ModuleOverview
      title="Notifications Center"
      subtitle="Real-time alerts for approvals, mentions, system updates, compliance events, and workspace changes."
      metrics={[
        { label: "Unread", value: "14", tone: "amber" },
        { label: "Mentions", value: "3", tone: "blue" },
        { label: "System", value: "2", tone: "slate" },
      ]}
      rows={[
        { item: "Approval required", company: "Group HQ", channel: "Finance", status: "Unread" },
        { item: "Mentioned in claim", company: "KFM", channel: "Claims", status: "Unread" },
        { item: "API sync complete", company: "KFS", channel: "Integrations", status: "Read" },
      ]}
    />
  );
}

