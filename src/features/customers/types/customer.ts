export const CUSTOMER_STATUSES = [
  "trial",
  "active",
  "paused",
  "churned",
] as const;

export const CUSTOMER_HEALTH_STATUSES = [
  "healthy",
  "needs-attention",
  "at-risk",
] as const;

export const CUSTOMER_SEGMENTS = [
  "startup",
  "smb",
  "mid-market",
  "enterprise",
] as const;

export const SUBSCRIPTION_PLANS = [
  "starter",
  "growth",
  "scale",
  "enterprise",
] as const;

export type CustomerStatus = (typeof CUSTOMER_STATUSES)[number];

export type CustomerHealthStatus = (typeof CUSTOMER_HEALTH_STATUSES)[number];

export type CustomerSegment = (typeof CUSTOMER_SEGMENTS)[number];

export type SubscriptionPlan = (typeof SUBSCRIPTION_PLANS)[number];

export type PaymentStatus = "current" | "overdue";

export interface CustomerOwner {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface CustomerContact {
  name: string;
  email: string;
  jobTitle: string;
}

export interface CustomerHealthSignals {
  productAdoption: number;
  onboardingProgress: number;
  supportSentiment: number;
  paymentStatus: PaymentStatus;
}

export interface Customer {
  id: string;
  companyName: string;
  domain: string;
  logoUrl?: string;

  industry: string;
  companySize: string;
  region: string;
  segment: CustomerSegment;

  status: CustomerStatus;
  healthStatus: CustomerHealthStatus;
  healthScore: number;
  healthSignals: CustomerHealthSignals;
  riskReason?: string;

  plan: SubscriptionPlan;
  monthlyRecurringRevenue: number;
  renewalDate: string;

  owner: CustomerOwner;
  primaryContact: CustomerContact;

  openIssuesCount: number;
  lastActivityAt: string;
  createdAt: string;
  updatedAt: string;
}

export type CustomerSortField =
  | "companyName"
  | "healthScore"
  | "monthlyRecurringRevenue"
  | "renewalDate"
  | "lastActivityAt";

export type SortDirection = "asc" | "desc";

export type CustomerListScenario = "default" | "empty" | "error";

export interface CustomerListParams {
  query?: string;
  statuses?: readonly CustomerStatus[];
  healthStatuses?: readonly CustomerHealthStatus[];
  segments?: readonly CustomerSegment[];
  sortBy?: CustomerSortField;
  sortDirection?: SortDirection;
  page?: number;
  pageSize?: number;
  scenario?: CustomerListScenario;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface CreateCustomerInput {
  companyName: string;
  domain: string;
  industry: string;
  companySize: string;
  region: string;
  segment: CustomerSegment;

  status: CustomerStatus;
  healthScore: number;
  healthSignals?: CustomerHealthSignals;
  riskReason?: string;

  plan: SubscriptionPlan;
  monthlyRecurringRevenue: number;
  renewalDate: string;

  owner: CustomerOwner;
  primaryContact: CustomerContact;
  openIssuesCount?: number;
}

export type UpdateCustomerInput = Partial<CreateCustomerInput>;
