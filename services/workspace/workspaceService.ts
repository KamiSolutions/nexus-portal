import { demoTenant } from "@/lib/tenant";

export async function listWorkspaces() {
  return demoTenant.companies;
}

