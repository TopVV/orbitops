export type HealthTone = "success" | "warning" | "error";

export interface HealthDistributionItem {
  label: string;
  count: number;
  percentage: number;
  tone: HealthTone;
}

export interface AtRiskCustomer {
  id: string;
  companyName: string;
  initials: string;
  riskReason: string;
  healthScore: number;
  renewalDate: string;
  owner: string;
}

export type ActivityType = "health" | "renewal" | "support" | "onboarding";

export interface RecentActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  occurredAt: string;
}

export const HEALTH_DISTRIBUTION = [
  {
    label: "Healthy",
    count: 88,
    percentage: 69,
    tone: "success",
  },
  {
    label: "Needs attention",
    count: 28,
    percentage: 22,
    tone: "warning",
  },
  {
    label: "At risk",
    count: 12,
    percentage: 9,
    tone: "error",
  },
] satisfies ReadonlyArray<HealthDistributionItem>;

export const AT_RISK_CUSTOMERS = [
  {
    id: "nova-analytics",
    companyName: "Nova Analytics",
    initials: "NA",
    riskReason: "Low product adoption",
    healthScore: 42,
    renewalDate: "Aug 8, 2026",
    owner: "Sarah Chen",
  },
  {
    id: "pulsepay",
    companyName: "PulsePay",
    initials: "PP",
    riskReason: "Multiple support escalations",
    healthScore: 48,
    renewalDate: "Aug 19, 2026",
    owner: "Daniel Kim",
  },
  {
    id: "vertex-labs",
    companyName: "Vertex Labs",
    initials: "VL",
    riskReason: "Onboarding stalled",
    healthScore: 51,
    renewalDate: "Sep 3, 2026",
    owner: "Emma Wilson",
  },
  {
    id: "northstar-cloud",
    companyName: "Northstar Cloud",
    initials: "NC",
    riskReason: "Payment overdue",
    healthScore: 55,
    renewalDate: "Sep 14, 2026",
    owner: "Marcus Lee",
  },
] satisfies ReadonlyArray<AtRiskCustomer>;

export const RECENT_ACTIVITY = [
  {
    id: "activity-1",
    type: "health",
    title: "Health score decreased",
    description: "Nova Analytics dropped from 58 to 42.",
    occurredAt: "18 minutes ago",
  },
  {
    id: "activity-2",
    type: "renewal",
    title: "Contract renewed",
    description: "Atlas Cloud renewed its Scale plan.",
    occurredAt: "1 hour ago",
  },
  {
    id: "activity-3",
    type: "support",
    title: "Support issue escalated",
    description: "PulsePay opened a priority support case.",
    occurredAt: "3 hours ago",
  },
  {
    id: "activity-4",
    type: "onboarding",
    title: "Onboarding completed",
    description: "BrightPath completed all onboarding steps.",
    occurredAt: "5 hours ago",
  },
] satisfies ReadonlyArray<RecentActivity>;
