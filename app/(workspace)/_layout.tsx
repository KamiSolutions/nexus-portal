import { WorkspaceShell } from "@/components/layout/WorkspaceShell";
import { Stack } from "expo-router";
import React from "react";

export default function WorkspaceLayout() {
  return (
    <WorkspaceShell>
      <Stack screenOptions={{ headerShown: false }} />
    </WorkspaceShell>
  );
}

