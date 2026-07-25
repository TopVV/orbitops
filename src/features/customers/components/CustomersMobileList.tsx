"use client";

import Link from "next/link";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  CustomerHealthChip,
  CustomerStatusChip,
} from "@/features/customers/components/CustomerChips";
import type { Customer } from "@/features/customers/types/customer";
import {
  formatCurrency,
  formatCustomerLabel,
  formatDate,
  getInitials,
} from "@/features/customers/utils/customer-formatters";

interface CustomersMobileListProps {
  customers: readonly Customer[];
}

interface CustomerPropertyProps {
  label: string;
  value: string;
}

function CustomerProperty({ label, value }: CustomerPropertyProps) {
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

export function CustomersMobileList({ customers }: CustomersMobileListProps) {
  return (
    <Box
      sx={{
        display: {
          xs: "block",
          md: "none",
        },
      }}
    >
      {customers.map((customer, index) => (
        <ButtonBase
          key={customer.id}
          component={Link}
          href={`/customers/${customer.id}`}
          aria-label={`View ${customer.companyName}`}
          sx={{
            display: "block",
            width: "100%",
            p: 2.5,
            textAlign: "left",
            borderBottom: index === customers.length - 1 ? 0 : "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack spacing={2}>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  fontSize: 13,
                  color: "primary.main",
                  bgcolor:
                    "color-mix(in srgb, var(--mui-palette-primary-main) 10%, transparent)",
                }}
              >
                {getInitials(customer.companyName)}
              </Avatar>

              <Stack
                spacing={0.25}
                sx={{
                  minWidth: 0,
                  flexGrow: 1,
                }}
              >
                <Typography variant="body2" noWrap sx={{ fontWeight: 700 }}>
                  {customer.companyName}
                </Typography>

                <Typography variant="caption" color="text.secondary" noWrap>
                  {customer.domain}
                </Typography>
              </Stack>

              <ArrowForwardRoundedIcon fontSize="small" color="action" />
            </Stack>

            <Stack
              direction="row"
              sx={{
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <CustomerStatusChip status={customer.status} />

              <CustomerHealthChip
                status={customer.healthStatus}
                score={customer.healthScore}
              />
            </Stack>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 2,
              }}
            >
              <CustomerProperty
                label="MRR"
                value={formatCurrency(customer.monthlyRecurringRevenue)}
              />

              <CustomerProperty label="Owner" value={customer.owner.name} />

              <CustomerProperty
                label="Plan"
                value={formatCustomerLabel(customer.plan)}
              />

              <CustomerProperty
                label="Renewal"
                value={formatDate(customer.renewalDate)}
              />
            </Box>
          </Stack>
        </ButtonBase>
      ))}
    </Box>
  );
}
