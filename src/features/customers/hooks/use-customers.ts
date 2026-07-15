"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { customerQueryKeys } from "@/features/customers/queries/customer-query-keys";
import { customerService } from "@/features/customers/services/customer-service";
import type { CustomerListParams } from "@/features/customers/types/customer";

export function useCustomers(params: CustomerListParams) {
  return useQuery({
    queryKey: customerQueryKeys.list(params),

    queryFn: ({ signal }) => customerService.list(params, signal),

    placeholderData: keepPreviousData,
  });
}
