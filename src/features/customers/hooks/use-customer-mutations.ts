"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { customerQueryKeys } from "@/features/customers/queries/customer-query-keys";
import { customerService } from "@/features/customers/services/customer-service";
import type {
  CreateCustomerInput,
  UpdateCustomerInput,
} from "@/features/customers/types/customer";

interface UpdateCustomerVariables {
  customerId: string;
  input: UpdateCustomerInput;
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCustomerInput) => customerService.create(input),

    onSuccess: async (customer) => {
      queryClient.setQueryData(customerQueryKeys.detail(customer.id), customer);

      await queryClient.invalidateQueries({
        queryKey: customerQueryKeys.lists(),
      });
    },
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ customerId, input }: UpdateCustomerVariables) =>
      customerService.update(customerId, input),

    onSuccess: async (customer) => {
      queryClient.setQueryData(customerQueryKeys.detail(customer.id), customer);

      await queryClient.invalidateQueries({
        queryKey: customerQueryKeys.lists(),
      });
    },
  });
}
