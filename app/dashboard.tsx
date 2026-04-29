import { Redirect } from "expo-router";
import React from "react";

export default function LegacyDashboardRoute() {
  return <Redirect href="/(workspace)/dashboard" />;
}

