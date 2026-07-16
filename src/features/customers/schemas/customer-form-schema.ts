import { z } from "zod";

import {
  CUSTOMER_COMPANY_SIZE_OPTIONS,
  CUSTOMER_INDUSTRY_OPTIONS,
  CUSTOMER_OWNER_OPTIONS,
  CUSTOMER_REGION_OPTIONS,
} from "@/features/customers/data/customer-form-options";
import {
  CUSTOMER_SEGMENTS,
  CUSTOMER_STATUSES,
  SUBSCRIPTION_PLANS,
} from "@/features/customers/types/customer";

const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} is required`);

export const customerFormSchema = z.object({
  companyName: requiredText("Company name")
    .min(2, "Company name must contain at least 2 characters")
    .max(100, "Company name is too long"),

  domain: requiredText("Domain").refine(
    (value) => z.hostname().safeParse(value).success,
    "Enter a valid domain, for example acme.com",
  ),

  industry: z.enum(CUSTOMER_INDUSTRY_OPTIONS),
  companySize: z.enum(CUSTOMER_COMPANY_SIZE_OPTIONS),
  region: z.enum(CUSTOMER_REGION_OPTIONS),

  status: z.enum(CUSTOMER_STATUSES),
  segment: z.enum(CUSTOMER_SEGMENTS),
  plan: z.enum(SUBSCRIPTION_PLANS),

  monthlyRecurringRevenue: z
    .number()
    .min(0, "MRR cannot be negative")
    .max(1_000_000, "MRR is too large"),

  renewalDate: requiredText("Renewal date").refine(
    (value) => z.iso.date().safeParse(value).success,
    "Enter a valid date",
  ),

  healthScore: z
    .number()
    .int("Health score must be a whole number")
    .min(0, "Minimum health score is 0")
    .max(100, "Maximum health score is 100"),

  ownerId: z.enum(
    CUSTOMER_OWNER_OPTIONS.map((owner) => owner.id) as [string, ...string[]],
  ),

  primaryContactName: requiredText("Contact name"),
  primaryContactEmail: requiredText("Contact email").refine(
    (value) => z.email().safeParse(value).success,
    "Enter a valid email address",
  ),
  primaryContactJobTitle: requiredText("Job title"),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;
