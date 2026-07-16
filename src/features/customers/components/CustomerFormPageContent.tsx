"use client";

import { useRouter } from "next/navigation";

import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { CustomerForm } from "@/features/customers/components/CustomerForm";
import {
  useCreateCustomer,
  useUpdateCustomer,
} from "@/features/customers/hooks/use-customer-mutations";
import { useCustomer } from "@/features/customers/hooks/use-customer";
import type { CustomerFormValues } from "@/features/customers/schemas/customer-form-schema";
import {
  getCustomerFormDefaultValues,
  mapCustomerFormToInput,
} from "@/features/customers/utils/customer-form-mappers";

interface CustomerFormPageContentProps {
  mode: "create" | "edit";
  customerId?: string;
}

export function CustomerFormPageContent({
  mode,
  customerId,
}: CustomerFormPageContentProps) {
  const router = useRouter();

  const customerQuery = useCustomer(mode === "edit" ? (customerId ?? "") : "");

  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();

  if (mode === "edit" && customerQuery.isPending) {
    return (
      <Stack spacing={3}>
        <Skeleton width={260} height={48} />
        <Skeleton variant="rounded" height={300} />
        <Skeleton variant="rounded" height={300} />
      </Stack>
    );
  }

  if (mode === "edit" && (customerQuery.isError || !customerQuery.data)) {
    return (
      <Alert severity="error">
        {customerQuery.error instanceof Error
          ? customerQuery.error.message
          : "Unable to load customer."}
      </Alert>
    );
  }

  const customer = mode === "edit" ? customerQuery.data : undefined;

  const mutation = mode === "create" ? createMutation : updateMutation;

  const handleSubmit = async (values: CustomerFormValues) => {
    const input = mapCustomerFormToInput(values);

    const savedCustomer =
      mode === "create"
        ? await createMutation.mutateAsync(input)
        : await updateMutation.mutateAsync({
            customerId: customerId!,
            input,
          });

    router.push(`/customers/${savedCustomer.id}`);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h1">
          {mode === "create" ? "Add customer" : `Edit ${customer?.companyName}`}
        </Typography>

        <Typography color="text.secondary">
          {mode === "create"
            ? "Create a new customer account."
            : "Update customer account information."}
        </Typography>
      </Stack>

      <CustomerForm
        mode={mode}
        defaultValues={getCustomerFormDefaultValues(customer)}
        cancelHref={customer ? `/customers/${customer.id}` : "/customers"}
        isSaving={mutation.isPending}
        serverError={
          mutation.error instanceof Error ? mutation.error.message : undefined
        }
        onSubmit={handleSubmit}
      />
    </Stack>
  );
}
