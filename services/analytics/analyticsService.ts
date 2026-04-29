import { approvalPipeline, executiveKpis, revenueTrend } from "@/lib/analytics";

export async function getExecutiveAnalytics() {
  return {
    executiveKpis,
    revenueTrend,
    approvalPipeline,
  };
}

