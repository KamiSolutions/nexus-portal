import { enterprisePalette } from "./constants";

export const executiveKpis = [
  { label: "Group revenue", value: "R43.9M", delta: "+12.8%", tone: "blue" },
  { label: "Approval cycle", value: "1.8 days", delta: "-24%", tone: "emerald" },
  { label: "Fleet uptime", value: "96.4%", delta: "+3.1%", tone: "cyan" },
  { label: "Open risk items", value: "18", delta: "-7", tone: "amber" },
];

export const revenueTrend = [
  { month: "Jan", value: 31 },
  { month: "Feb", value: 35 },
  { month: "Mar", value: 34 },
  { month: "Apr", value: 39 },
  { month: "May", value: 42 },
  { month: "Jun", value: 44 },
];

export const approvalPipeline = [
  { label: "Finance", count: 18, color: enterprisePalette.blue },
  { label: "HR", count: 7, color: enterprisePalette.emerald },
  { label: "Claims", count: 11, color: enterprisePalette.amber },
  { label: "Leases", count: 4, color: enterprisePalette.violet },
];

export const activityFeed = [
  "Kusile Financial Services approved 8 requisitions",
  "Fleet Management uploaded 3 maintenance records",
  "Group Admin invited 5 subsidiary auditors",
  "Claims queue SLA improved by 18% this week",
];

