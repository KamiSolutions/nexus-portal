import { AppProviders } from "@/providers/AppProviders";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </AppProviders>
  );
}

