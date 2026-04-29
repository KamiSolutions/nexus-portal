import { Redirect } from "expo-router";
import React from "react";

export default function LegacyFinancialsRoute() {
  return <Redirect href="/(workspace)/finance" />;
}

