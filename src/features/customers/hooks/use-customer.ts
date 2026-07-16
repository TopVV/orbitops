"use client";

import { useQuery } from "@tanstack/react-query";

import { customerQueryKeys } from "@/features/customers/queries/customer-query-keys";
import {
  customerService,
  CustomerServiceError,
} from "@/features/customers/services/customer-service";

export function useCustomer(customerId: string) {
  return useQuery({
    queryKey: customerQueryKeys.detail(customerId),

    queryFn: ({ signal }) => customerService.getById(customerId, signal),

    enabled: Boolean(customerId),

    retry: (failureCount, error) => {
      if (
        error instanceof CustomerServiceError &&
        error.code === "CUSTOMER_NOT_FOUND"
      ) {
        return false;
      }

      return failureCount < 1;
    },
  });
}
