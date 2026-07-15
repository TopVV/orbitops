import { CUSTOMER_FIXTURES } from "@/features/customers/data/customer-fixtures";
import type {
  CreateCustomerInput,
  Customer,
  CustomerHealthSignals,
  CustomerListParams,
  PaginatedResponse,
  UpdateCustomerInput,
} from "@/features/customers/types/customer";
import {
  clampHealthScore,
  getCustomerHealthStatus,
} from "@/features/customers/utils/get-customer-health-status";

const SIMULATED_LATENCY_MS = 650;
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

export class CustomerServiceError extends Error {
  constructor(
    message: string,
    public readonly code:
      | "CUSTOMERS_FETCH_FAILED"
      | "CUSTOMER_NOT_FOUND"
      | "CUSTOMER_CREATE_FAILED"
      | "CUSTOMER_UPDATE_FAILED",
  ) {
    super(message);
    this.name = "CustomerServiceError";
  }
}

function cloneCustomer(customer: Customer): Customer {
  return {
    ...customer,
    owner: { ...customer.owner },
    primaryContact: { ...customer.primaryContact },
    healthSignals: { ...customer.healthSignals },
  };
}

let customerStore = CUSTOMER_FIXTURES.map(cloneCustomer);

function wait(milliseconds: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("The operation was aborted.", "AbortError"));

      return;
    }

    const handleAbort = () => {
      clearTimeout(timeoutId);

      reject(new DOMException("The operation was aborted.", "AbortError"));
    };

    const timeoutId = setTimeout(() => {
      signal?.removeEventListener("abort", handleAbort);

      resolve();
    }, milliseconds);

    signal?.addEventListener("abort", handleAbort, { once: true });
  });
}

function createDefaultHealthSignals(
  healthScore: number,
): CustomerHealthSignals {
  return {
    productAdoption: healthScore,
    onboardingProgress: clampHealthScore(healthScore + 10),
    supportSentiment: healthScore,
    paymentStatus: "current",
  };
}

function createUniqueId(companyName: string): string {
  const baseId = companyName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  let candidate = baseId;
  let suffix = 2;

  while (customerStore.some((customer) => customer.id === candidate)) {
    candidate = `${baseId}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

function compareCustomers(
  first: Customer,
  second: Customer,
  sortBy: NonNullable<CustomerListParams["sortBy"]>,
): number {
  switch (sortBy) {
    case "companyName":
      return first.companyName.localeCompare(second.companyName);

    case "healthScore":
      return first.healthScore - second.healthScore;

    case "monthlyRecurringRevenue":
      return first.monthlyRecurringRevenue - second.monthlyRecurringRevenue;

    case "renewalDate":
      return Date.parse(first.renewalDate) - Date.parse(second.renewalDate);

    case "lastActivityAt":
      return (
        Date.parse(first.lastActivityAt) - Date.parse(second.lastActivityAt)
      );

    default:
      return 0;
  }
}

async function listCustomers(
  params: CustomerListParams = {},
  signal?: AbortSignal,
): Promise<PaginatedResponse<Customer>> {
  await wait(SIMULATED_LATENCY_MS, signal);

  if (params.scenario === "error") {
    throw new CustomerServiceError(
      "Unable to load customers.",
      "CUSTOMERS_FETCH_FAILED",
    );
  }

  const page = Math.max(DEFAULT_PAGE, params.page ?? DEFAULT_PAGE);

  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, params.pageSize ?? DEFAULT_PAGE_SIZE),
  );

  if (params.scenario === "empty") {
    return {
      data: [],
      page,
      pageSize,
      totalItems: 0,
      totalPages: 0,
    };
  }

  const normalizedQuery = params.query?.trim().toLowerCase() ?? "";

  const filteredCustomers = customerStore.filter((customer) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [
        customer.companyName,
        customer.domain,
        customer.primaryContact.name,
        customer.primaryContact.email,
      ].some((value) => value.toLowerCase().includes(normalizedQuery));

    const matchesStatus =
      !params.statuses?.length || params.statuses.includes(customer.status);

    const matchesHealth =
      !params.healthStatuses?.length ||
      params.healthStatuses.includes(customer.healthStatus);

    const matchesSegment =
      !params.segments?.length || params.segments.includes(customer.segment);

    return matchesQuery && matchesStatus && matchesHealth && matchesSegment;
  });

  const sortBy = params.sortBy ?? "companyName";
  const directionMultiplier = params.sortDirection === "desc" ? -1 : 1;

  filteredCustomers.sort(
    (first, second) =>
      compareCustomers(first, second, sortBy) * directionMultiplier,
  );

  const totalItems = filteredCustomers.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const startIndex = (page - 1) * pageSize;

  return {
    data: filteredCustomers
      .slice(startIndex, startIndex + pageSize)
      .map(cloneCustomer),
    page,
    pageSize,
    totalItems,
    totalPages,
  };
}

async function getCustomerById(
  customerId: string,
  signal?: AbortSignal,
): Promise<Customer> {
  await wait(SIMULATED_LATENCY_MS, signal);

  const customer = customerStore.find((item) => item.id === customerId);

  if (!customer) {
    throw new CustomerServiceError("Customer not found.", "CUSTOMER_NOT_FOUND");
  }

  return cloneCustomer(customer);
}

async function createCustomer(input: CreateCustomerInput): Promise<Customer> {
  await wait(SIMULATED_LATENCY_MS);

  const now = new Date().toISOString();
  const healthScore = clampHealthScore(input.healthScore);

  const customer: Customer = {
    ...input,
    id: createUniqueId(input.companyName),
    healthScore,
    healthStatus: getCustomerHealthStatus(healthScore),
    healthSignals:
      input.healthSignals ?? createDefaultHealthSignals(healthScore),
    openIssuesCount: input.openIssuesCount ?? 0,
    lastActivityAt: now,
    createdAt: now,
    updatedAt: now,
  };

  customerStore = [cloneCustomer(customer), ...customerStore];

  return cloneCustomer(customer);
}

async function updateCustomer(
  customerId: string,
  input: UpdateCustomerInput,
): Promise<Customer> {
  await wait(SIMULATED_LATENCY_MS);

  const customerIndex = customerStore.findIndex(
    (customer) => customer.id === customerId,
  );

  if (customerIndex === -1) {
    throw new CustomerServiceError("Customer not found.", "CUSTOMER_NOT_FOUND");
  }

  const currentCustomer = customerStore[customerIndex];

  const healthScore = clampHealthScore(
    input.healthScore ?? currentCustomer.healthScore,
  );

  const updatedCustomer: Customer = {
    ...currentCustomer,
    ...input,
    id: currentCustomer.id,
    healthScore,
    healthStatus: getCustomerHealthStatus(healthScore),
    healthSignals: input.healthSignals ?? currentCustomer.healthSignals,
    updatedAt: new Date().toISOString(),
  };

  customerStore[customerIndex] = cloneCustomer(updatedCustomer);

  return cloneCustomer(updatedCustomer);
}

function resetCustomers(): void {
  customerStore = CUSTOMER_FIXTURES.map(cloneCustomer);
}

export const customerService = {
  list: listCustomers,
  getById: getCustomerById,
  create: createCustomer,
  update: updateCustomer,
  reset: resetCustomers,
};
