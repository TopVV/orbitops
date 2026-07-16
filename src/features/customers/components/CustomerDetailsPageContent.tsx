"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip, { type ChipProps } from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useCustomer } from "@/features/customers/hooks/use-customer";
import type {
  CustomerHealthStatus,
  CustomerStatus,
} from "@/features/customers/types/customer";
import {
  formatCurrency,
  formatCustomerLabel,
  formatDate,
  getInitials,
} from "@/features/customers/utils/customer-formatters";
import { CustomerServiceError } from "@/features/customers/services/customer-service";

interface CustomerDetailsPageContentProps {
  customerId: string;
}

interface MetricCardProps {
  label: string;
  value: string;
  icon: ReactNode;
}

interface DetailItemProps {
  label: string;
  value: string;
}

interface HealthSignalProps {
  label: string;
  value: number;
}

const STATUS_COLORS: Record<CustomerStatus, ChipProps["color"]> = {
  trial: "primary",
  active: "success",
  paused: "warning",
  churned: "default",
};

const HEALTH_COLORS: Record<CustomerHealthStatus, ChipProps["color"]> = {
  healthy: "success",
  "needs-attention": "warning",
  "at-risk": "error",
};

function MetricCard({ label, value, icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent
        sx={{
          p: 2.5,
          "&:last-child": {
            pb: 2.5,
          },
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Stack spacing={0.75}>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>

            <Typography variant="h3" component="p" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "grid",
              width: 40,
              height: 40,
              flexShrink: 0,
              placeItems: "center",
              borderRadius: 2,
              color: "primary.main",
              bgcolor:
                "color-mix(in srgb, var(--mui-palette-primary-main) 10%, transparent)",
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <Stack spacing={0.25}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>

      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Stack>
  );
}

function getSignalColor(value: number): string {
  if (value >= 75) {
    return "var(--mui-palette-success-main)";
  }

  if (value >= 60) {
    return "var(--mui-palette-warning-main)";
  }

  return "var(--mui-palette-error-main)";
}

function HealthSignal({ label, value }: HealthSignalProps) {
  const color = getSignalColor(value);

  return (
    <Stack spacing={1}>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2">{label}</Typography>

        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {value}%
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={value}
        aria-label={label}
        sx={{
          height: 8,
          borderRadius: 999,
          bgcolor: "#EEF2F6",

          "& .MuiLinearProgress-bar": {
            borderRadius: 999,
            bgcolor: color,
          },
        }}
      />
    </Stack>
  );
}

function CustomerDetailsSkeleton() {
  return (
    <Stack spacing={3}>
      <Skeleton width={130} height={40} />

      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          gap: 2,
        }}
      >
        <Skeleton variant="circular" width={64} height={64} />

        <Stack spacing={0.5}>
          <Skeleton width={240} height={40} />
          <Skeleton width={160} />
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} variant="rounded" height={120} />
        ))}
      </Box>

      <Skeleton variant="rounded" height={320} />
    </Stack>
  );
}

export function CustomerDetailsPageContent({
  customerId,
}: CustomerDetailsPageContentProps) {
  const {
    data: customer,
    error,
    isError,
    isPending,
    refetch,
  } = useCustomer(customerId);

  if (isPending) {
    return <CustomerDetailsSkeleton />;
  }

  if (isError || !customer) {
    const isNotFound =
      error instanceof CustomerServiceError &&
      error.code === "CUSTOMER_NOT_FOUND";

    return (
      <Stack spacing={3}>
        <Button
          component={Link}
          href="/customers"
          startIcon={<ArrowBackRoundedIcon />}
          sx={{ alignSelf: "flex-start" }}
        >
          Back to customers
        </Button>

        <Alert
          severity="error"
          action={
            !isNotFound ? (
              <Button color="inherit" size="small" onClick={() => refetch()}>
                Retry
              </Button>
            ) : undefined
          }
        >
          {isNotFound ? "Customer not found." : "Unable to load customer."}
        </Alert>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Button
        component={Link}
        href="/customers"
        startIcon={<ArrowBackRoundedIcon />}
        sx={{ alignSelf: "flex-start" }}
      >
        Back to customers
      </Button>

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        sx={{
          alignItems: {
            xs: "stretch",
            sm: "center",
          },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              width: 64,
              height: 64,
              fontSize: 20,
              color: "primary.main",
              bgcolor:
                "color-mix(in srgb, var(--mui-palette-primary-main) 10%, transparent)",
            }}
          >
            {getInitials(customer.companyName)}
          </Avatar>

          <Stack spacing={0.75}>
            <Typography variant="h1">{customer.companyName}</Typography>

            <Typography color="text.secondary">{customer.domain}</Typography>

            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Chip
                size="small"
                variant="outlined"
                color={STATUS_COLORS[customer.status]}
                label={formatCustomerLabel(customer.status)}
              />

              <Chip
                size="small"
                color={HEALTH_COLORS[customer.healthStatus]}
                label={`${customer.healthScore} · ${formatCustomerLabel(
                  customer.healthStatus,
                )}`}
                sx={{ fontWeight: 600 }}
              />
            </Stack>
          </Stack>
        </Stack>

        <Button
          component={Link}
          href={`/customers/${customer.id}/edit`}
          variant="contained"
          startIcon={<EditRoundedIcon />}
        >
          Edit customer
        </Button>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            sm: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        <MetricCard
          label="Monthly recurring revenue"
          value={formatCurrency(customer.monthlyRecurringRevenue)}
          icon={<PaymentsRoundedIcon />}
        />

        <MetricCard
          label="Subscription plan"
          value={formatCustomerLabel(customer.plan)}
          icon={<BusinessRoundedIcon />}
        />

        <MetricCard
          label="Renewal date"
          value={formatDate(customer.renewalDate)}
          icon={<EventRoundedIcon />}
        />

        <MetricCard
          label="Open issues"
          value={String(customer.openIssuesCount)}
          icon={<ReportProblemRoundedIcon />}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            lg: "minmax(0, 7fr) minmax(300px, 5fr)",
          },
          gap: 3,
        }}
      >
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
              <Typography variant="h3">Account overview</Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                  },
                  gap: 3,
                }}
              >
                <DetailItem label="Industry" value={customer.industry} />

                <DetailItem
                  label="Segment"
                  value={formatCustomerLabel(customer.segment)}
                />

                <DetailItem label="Company size" value={customer.companySize} />

                <DetailItem label="Region" value={customer.region} />

                <DetailItem label="Account owner" value={customer.owner.name} />

                <DetailItem
                  label="Customer since"
                  value={formatDate(customer.createdAt)}
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
              <Typography variant="h3">Primary contact</Typography>

              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Avatar>{getInitials(customer.primaryContact.name)}</Avatar>

                <Stack spacing={0.25}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {customer.primaryContact.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {customer.primaryContact.jobTitle}
                  </Typography>
                </Stack>
              </Stack>

              <DetailItem label="Email" value={customer.primaryContact.email} />

              <DetailItem label="Account owner" value={customer.owner.email} />
            </Stack>
          </CardContent>
        </Card>
      </Box>

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
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Stack spacing={0.5}>
                <Typography variant="h3">Customer health signals</Typography>

                <Typography variant="body2" color="text.secondary">
                  Operational indicators affecting the account health score.
                </Typography>
              </Stack>

              <ShieldRoundedIcon color="primary" />
            </Stack>

            {customer.riskReason && (
              <Alert severity="warning">
                Primary risk signal: <strong>{customer.riskReason}</strong>
              </Alert>
            )}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(3, 1fr)",
                },
                gap: 3,
              }}
            >
              <HealthSignal
                label="Product adoption"
                value={customer.healthSignals.productAdoption}
              />

              <HealthSignal
                label="Onboarding progress"
                value={customer.healthSignals.onboardingProgress}
              />

              <HealthSignal
                label="Support sentiment"
                value={customer.healthSignals.supportSentiment}
              />
            </Box>

            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                pt: 2,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="body2">Payment status</Typography>

              <Chip
                size="small"
                color={
                  customer.healthSignals.paymentStatus === "current"
                    ? "success"
                    : "error"
                }
                label={formatCustomerLabel(
                  customer.healthSignals.paymentStatus,
                )}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
