import { Redirect } from "expo-router";
import React from "react";

export default function LegacyUsersRoute() {
  return <Redirect href="/(workspace)/employees" />;
}

