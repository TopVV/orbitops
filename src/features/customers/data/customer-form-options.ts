import type { CustomerOwner } from "@/features/customers/types/customer";

export const CUSTOMER_OWNER_OPTIONS = [
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
] as const satisfies ReadonlyArray<CustomerOwner>;

export const CUSTOMER_INDUSTRY_OPTIONS = [
  "Data & Analytics",
  "Financial Services",
  "Developer Tools",
  "Cloud Infrastructure",
  "Healthcare",
  "E-commerce",
  "Cybersecurity",
  "Business Intelligence",
] as const;

export const CUSTOMER_COMPANY_SIZE_OPTIONS = [
  "11–50",
  "51–200",
  "201–1,000",
  "1,000+",
] as const;

export const CUSTOMER_REGION_OPTIONS = [
  "North America",
  "Europe",
  "Asia Pacific",
  "United Kingdom",
] as const;
