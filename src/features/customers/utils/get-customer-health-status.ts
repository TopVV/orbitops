import type { CustomerHealthStatus } from "@/features/customers/types/customer";

export function clampHealthScore(score: number): number {
  return Math.min(100, Math.max(0, Math.round(score)));
}

export function getCustomerHealthStatus(score: number): CustomerHealthStatus {
  const normalizedScore = clampHealthScore(score);

  if (normalizedScore >= 75) {
    return "healthy";
  }

  if (normalizedScore >= 60) {
    return "needs-attention";
  }

  return "at-risk";
}
