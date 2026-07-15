import type {
  Customer,
  CustomerContact,
  CustomerOwner,
  CustomerSegment,
  CustomerStatus,
  SubscriptionPlan,
} from "@/features/customers/types/customer";
import {
  clampHealthScore,
  getCustomerHealthStatus,
} from "@/features/customers/utils/get-customer-health-status";

const COMPANY_NAMES = [
  "Nova Analytics",
  "PulsePay",
  "Vertex Labs",
  "Northstar Cloud",
  "Atlas Cloud",
  "BrightPath",
  "Luma Commerce",
  "Apex Systems",
  "Cedar Health",
  "Fluxboard",
  "Meridian AI",
  "HarborStack",
  "Kiteworks",
  "Evergreen Labs",
  "QuantumDesk",
  "BluePeak",
  "Summitly",
  "NexaGrid",
  "CloudForge",
  "MetricFlow",
  "Orbit Finance",
  "SignalNest",
  "TruNorth",
  "Acme Robotics",
  "PioneerWorks",
  "DataSprout",
  "HelioOps",
  "Redwood Digital",
  "Zenith Health",
  "CoreSync",
  "Wavefront AI",
  "Mosaic Labs",
] as const;

const INDUSTRIES = [
  "Data & Analytics",
  "Financial Services",
  "Developer Tools",
  "Cloud Infrastructure",
  "Healthcare",
  "E-commerce",
  "Cybersecurity",
  "Business Intelligence",
] as const;

const REGIONS = [
  "North America",
  "Europe",
  "Asia Pacific",
  "United Kingdom",
] as const;

const OWNERS = [
  {
    id: "owner-sarah-chen",
    name: "Sarah Chen",
    email: "sarah.chen@orbitops.io",
  },
  {
    id: "owner-daniel-kim",
    name: "Daniel Kim",
    email: "daniel.kim@orbitops.io",
  },
  {
    id: "owner-emma-wilson",
    name: "Emma Wilson",
    email: "emma.wilson@orbitops.io",
  },
  {
    id: "owner-marcus-lee",
    name: "Marcus Lee",
    email: "marcus.lee@orbitops.io",
  },
] satisfies ReadonlyArray<CustomerOwner>;

const CONTACTS = [
  ["Olivia Martin", "VP of Operations"],
  ["Liam Anderson", "Head of Customer Success"],
  ["Sophia Patel", "Chief Operating Officer"],
  ["Noah Williams", "Director of Operations"],
  ["Mia Thompson", "Customer Success Lead"],
  ["Ethan Davis", "VP of Revenue"],
  ["Ava Robinson", "Operations Manager"],
  ["Lucas Garcia", "Head of Partnerships"],
] as const;

const SEGMENT_CONFIGURATION: Record<
  CustomerSegment,
  {
    companySize: string;
    plan: SubscriptionPlan;
    baseMrr: number;
  }
> = {
  startup: {
    companySize: "11–50",
    plan: "starter",
    baseMrr: 850,
  },
  smb: {
    companySize: "51–200",
    plan: "growth",
    baseMrr: 2_800,
  },
  "mid-market": {
    companySize: "201–1,000",
    plan: "scale",
    baseMrr: 7_800,
  },
  enterprise: {
    companySize: "1,000+",
    plan: "enterprise",
    baseMrr: 18_000,
  },
};

const RISK_REASONS = [
  "Low product adoption",
  "Multiple support escalations",
  "Onboarding stalled",
  "Payment overdue",
] as const;

function toSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getSegment(index: number): CustomerSegment {
  const segments: readonly CustomerSegment[] = [
    "mid-market",
    "enterprise",
    "smb",
    "startup",
  ];

  return segments[index % segments.length];
}

function getCustomerStatus(index: number): CustomerStatus {
  if ([5, 14, 23].includes(index)) {
    return "trial";
  }

  if ([12, 26].includes(index)) {
    return "paused";
  }

  if (index === 31) {
    return "churned";
  }

  return "active";
}

function getHealthScore(index: number): number {
  const atRiskScores = [42, 48, 51, 55];

  if (index < atRiskScores.length) {
    return atRiskScores[index];
  }

  if (index < 11) {
    return 62 + (index - 4) * 2;
  }

  return 76 + ((index * 7) % 21);
}

function createPrimaryContact(index: number, domain: string): CustomerContact {
  const [name, jobTitle] = CONTACTS[index % CONTACTS.length];

  const emailName = name.toLowerCase().replace(/\s+/g, ".");

  return {
    name,
    jobTitle,
    email: `${emailName}@${domain}`,
  };
}

function createCustomer(companyName: string, index: number): Customer {
  const id = toSlug(companyName);
  const domain = `${id}.io`;
  const segment = getSegment(index);
  const status = getCustomerStatus(index);
  const healthScore = getHealthScore(index);
  const segmentConfiguration = SEGMENT_CONFIGURATION[segment];

  const isPaymentOverdue = index === 3;

  const monthlyRecurringRevenue =
    status === "churned" ? 0 : segmentConfiguration.baseMrr + index * 135;

  const renewalDate =
    status === "churned"
      ? "2026-05-18T00:00:00.000Z"
      : new Date(
          Date.UTC(2026, 7 + Math.floor(index / 6), 5 + ((index * 4) % 23)),
        ).toISOString();

  const lastActivityAt = new Date(
    Date.UTC(2026, 6, 15 - (index % 12), 12 - (index % 5)),
  ).toISOString();

  return {
    id,
    companyName,
    domain,

    industry: INDUSTRIES[index % INDUSTRIES.length],
    companySize: segmentConfiguration.companySize,
    region: REGIONS[index % REGIONS.length],
    segment,

    status,
    healthStatus: getCustomerHealthStatus(healthScore),
    healthScore,
    riskReason: index < RISK_REASONS.length ? RISK_REASONS[index] : undefined,

    healthSignals: {
      productAdoption: clampHealthScore(healthScore + ((index % 5) - 2) * 4),
      onboardingProgress:
        status === "trial"
          ? 35 + (index % 4) * 12
          : clampHealthScore(healthScore + 15),
      supportSentiment: clampHealthScore(healthScore + ((index % 3) - 1) * 8),
      paymentStatus: isPaymentOverdue ? "overdue" : "current",
    },

    plan: segmentConfiguration.plan,
    monthlyRecurringRevenue,
    renewalDate,

    owner: OWNERS[index % OWNERS.length],
    primaryContact: createPrimaryContact(index, domain),

    openIssuesCount: healthScore < 60 ? 3 + (index % 4) : index % 3,

    lastActivityAt,
    createdAt: new Date(
      Date.UTC(2025, index % 12, 2 + (index % 24)),
    ).toISOString(),
    updatedAt: lastActivityAt,
  };
}

export const CUSTOMER_FIXTURES: readonly Customer[] =
  COMPANY_NAMES.map(createCustomer);
