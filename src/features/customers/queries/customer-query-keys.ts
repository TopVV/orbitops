import type { CustomerListParams } from "@/features/customers/types/customer";

export const customerQueryKeys = {
  all: ["customers"] as const,

  lists: () => [...customerQueryKeys.all, "list"] as const,

  list: (params: CustomerListParams) =>
    [...customerQueryKeys.lists(), params] as const,

  details: () => [...customerQueryKeys.all, "detail"] as const,

  detail: (customerId: string) =>
    [...customerQueryKeys.details(), customerId] as const,
};
