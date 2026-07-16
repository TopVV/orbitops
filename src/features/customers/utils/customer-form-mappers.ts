import { CUSTOMER_OWNER_OPTIONS } from "@/features/customers/data/customer-form-options";
import type { CustomerFormValues } from "@/features/customers/schemas/customer-form-schema";
import type {
  CreateCustomerInput,
  Customer,
} from "@/features/customers/types/customer";

export function getCustomerFormDefaultValues(
  customer?: Customer,
): CustomerFormValues {
  if (!customer) {
    return {
      companyName: "",
      domain: "",
      industry: "Data & Analytics",
      companySize: "51–200",
      region: "North America",

      status: "active",
      segment: "smb",
      plan: "growth",

      monthlyRecurringRevenue: 0,
      renewalDate: "",
      healthScore: 80,

      ownerId: CUSTOMER_OWNER_OPTIONS[0].id,

      primaryContactName: "",
      primaryContactEmail: "",
      primaryContactJobTitle: "",
    };
  }

  return {
    companyName: customer.companyName,
    domain: customer.domain,
    industry: customer.industry as CustomerFormValues["industry"],
    companySize: customer.companySize as CustomerFormValues["companySize"],
    region: customer.region as CustomerFormValues["region"],

    status: customer.status,
    segment: customer.segment,
    plan: customer.plan,

    monthlyRecurringRevenue: customer.monthlyRecurringRevenue,
    renewalDate: customer.renewalDate.slice(0, 10),
    healthScore: customer.healthScore,

    ownerId: customer.owner.id,

    primaryContactName: customer.primaryContact.name,
    primaryContactEmail: customer.primaryContact.email,
    primaryContactJobTitle: customer.primaryContact.jobTitle,
  };
}

export function mapCustomerFormToInput(
  values: CustomerFormValues,
): CreateCustomerInput {
  const owner = CUSTOMER_OWNER_OPTIONS.find(
    (item) => item.id === values.ownerId,
  );

  if (!owner) {
    throw new Error("Selected account owner was not found.");
  }

  return {
    companyName: values.companyName,
    domain: values.domain,
    industry: values.industry,
    companySize: values.companySize,
    region: values.region,

    status: values.status,
    segment: values.segment,
    plan: values.plan,

    monthlyRecurringRevenue: values.monthlyRecurringRevenue,

    renewalDate: new Date(`${values.renewalDate}T00:00:00.000Z`).toISOString(),

    healthScore: values.healthScore,

    owner: {
      ...owner,
    },

    primaryContact: {
      name: values.primaryContactName,
      email: values.primaryContactEmail,
      jobTitle: values.primaryContactJobTitle,
    },
  };
}
