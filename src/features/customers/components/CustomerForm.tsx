"use client";

import Link from "next/link";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  CUSTOMER_COMPANY_SIZE_OPTIONS,
  CUSTOMER_INDUSTRY_OPTIONS,
  CUSTOMER_OWNER_OPTIONS,
  CUSTOMER_REGION_OPTIONS,
} from "@/features/customers/data/customer-form-options";
import {
  customerFormSchema,
  type CustomerFormValues,
} from "@/features/customers/schemas/customer-form-schema";
import {
  CUSTOMER_SEGMENTS,
  CUSTOMER_STATUSES,
  SUBSCRIPTION_PLANS,
} from "@/features/customers/types/customer";

interface CustomerFormProps {
  mode: "create" | "edit";
  defaultValues: CustomerFormValues;
  cancelHref: string;
  isSaving: boolean;
  serverError?: string;
  onSubmit: (values: CustomerFormValues) => Promise<void>;
}

function formatLabel(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function CustomerForm({
  mode,
  defaultValues,
  cancelHref,
  isSaving,
  serverError,
  onSubmit,
}: CustomerFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const isPending = isSaving || isSubmitting;

  const submitHandler: SubmitHandler<CustomerFormValues> = async (values) => {
    await onSubmit(values);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing={3}>
        {serverError && <Alert severity="error">{serverError}</Alert>}

        <Card>
          <CardContent
            sx={{
              p: 3,
              "&:last-child": {
                pb: 3,
              },
            }}
          >
            <Stack spacing={3}>
              <Stack spacing={0.5}>
                <Typography variant="h3">Company information</Typography>

                <Typography variant="body2" color="text.secondary">
                  Basic information about the customer account.
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                  },
                  gap: 2.5,
                }}
              >
                <TextField
                  label="Company name"
                  autoFocus={mode === "create"}
                  {...register("companyName")}
                  error={Boolean(errors.companyName)}
                  helperText={errors.companyName?.message}
                />

                <TextField
                  label="Company domain"
                  placeholder="acme.com"
                  {...register("domain")}
                  error={Boolean(errors.domain)}
                  helperText={errors.domain?.message}
                />

                <Controller
                  name="industry"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      select
                      label="Industry"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                    >
                      {CUSTOMER_INDUSTRY_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Controller
                  name="companySize"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      select
                      label="Company size"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                    >
                      {CUSTOMER_COMPANY_SIZE_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Controller
                  name="region"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      select
                      label="Region"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                    >
                      {CUSTOMER_REGION_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent
            sx={{
              p: 3,
              "&:last-child": {
                pb: 3,
              },
            }}
          >
            <Stack spacing={3}>
              <Stack spacing={0.5}>
                <Typography variant="h3">Account configuration</Typography>

                <Typography variant="body2" color="text.secondary">
                  Subscription, ownership and operational health.
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                    xl: "repeat(3, minmax(0, 1fr))",
                  },
                  gap: 2.5,
                }}
              >
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Status">
                      {CUSTOMER_STATUSES.map((option) => (
                        <MenuItem key={option} value={option}>
                          {formatLabel(option)}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Controller
                  name="segment"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Segment">
                      {CUSTOMER_SEGMENTS.map((option) => (
                        <MenuItem key={option} value={option}>
                          {formatLabel(option)}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Controller
                  name="plan"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Subscription plan">
                      {SUBSCRIPTION_PLANS.map((option) => (
                        <MenuItem key={option} value={option}>
                          {formatLabel(option)}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <TextField
                  label="Monthly recurring revenue"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      min: 0,
                      step: 100,
                    },
                  }}
                  {...register("monthlyRecurringRevenue", {
                    valueAsNumber: true,
                  })}
                  error={Boolean(errors.monthlyRecurringRevenue)}
                  helperText={errors.monthlyRecurringRevenue?.message}
                />

                <TextField
                  label="Renewal date"
                  type="date"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  {...register("renewalDate")}
                  error={Boolean(errors.renewalDate)}
                  helperText={errors.renewalDate?.message}
                />

                <TextField
                  label="Health score"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      min: 0,
                      max: 100,
                      step: 1,
                    },
                  }}
                  {...register("healthScore", {
                    valueAsNumber: true,
                  })}
                  error={Boolean(errors.healthScore)}
                  helperText={errors.healthScore?.message}
                />

                <Controller
                  name="ownerId"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Account owner">
                      {CUSTOMER_OWNER_OPTIONS.map((owner) => (
                        <MenuItem key={owner.id} value={owner.id}>
                          {owner.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent
            sx={{
              p: 3,
              "&:last-child": {
                pb: 3,
              },
            }}
          >
            <Stack spacing={3}>
              <Stack spacing={0.5}>
                <Typography variant="h3">Primary contact</Typography>

                <Typography variant="body2" color="text.secondary">
                  Main stakeholder for this customer account.
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                  },
                  gap: 2.5,
                }}
              >
                <TextField
                  label="Contact name"
                  {...register("primaryContactName")}
                  error={Boolean(errors.primaryContactName)}
                  helperText={errors.primaryContactName?.message}
                />

                <TextField
                  label="Email"
                  type="email"
                  {...register("primaryContactEmail")}
                  error={Boolean(errors.primaryContactEmail)}
                  helperText={errors.primaryContactEmail?.message}
                />

                <TextField
                  label="Job title"
                  {...register("primaryContactJobTitle")}
                  error={Boolean(errors.primaryContactJobTitle)}
                  helperText={errors.primaryContactJobTitle?.message}
                />
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Stack
          direction={{
            xs: "column-reverse",
            sm: "row",
          }}
          sx={{
            justifyContent: "flex-end",
            gap: 1.5,
          }}
        >
          <Button
            component={Link}
            href={cancelHref}
            variant="outlined"
            disabled={isPending}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            startIcon={
              isPending ? (
                <CircularProgress size={16} color="inherit" />
              ) : undefined
            }
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            {isPending
              ? "Saving..."
              : mode === "create"
                ? "Create customer"
                : "Save changes"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
