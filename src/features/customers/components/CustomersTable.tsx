"use client";

import Link from "next/link";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Avatar from "@mui/material/Avatar";
import Chip, { type ChipProps } from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import TableSortLabel from "@mui/material/TableSortLabel";

import {
  formatCurrency,
  formatCustomerLabel,
  formatDate,
  getInitials,
} from "@/features/customers/utils/customer-formatters";

import type {
  Customer,
  CustomerHealthStatus,
  CustomerSortField,
  CustomerStatus,
  SortDirection,
} from "@/features/customers/types/customer";

interface CustomersTableProps {
  customers: readonly Customer[];
  sortBy: CustomerSortField;
  sortDirection: SortDirection;
  onSortChange: (field: CustomerSortField) => void;
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

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatLabel(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

interface SortableHeaderProps {
  field: CustomerSortField;
  label: string;
  align?: "left" | "right";
  sortBy: CustomerSortField;
  sortDirection: SortDirection;
  onSortChange: (field: CustomerSortField) => void;
}

function SortableHeader({
  field,
  label,
  align = "left",
  sortBy,
  sortDirection,
  onSortChange,
}: SortableHeaderProps) {
  const isActive = sortBy === field;

  return (
    <TableCell align={align} sortDirection={isActive ? sortDirection : false}>
      <TableSortLabel
        active={isActive}
        direction={isActive ? sortDirection : "asc"}
        onClick={() => onSortChange(field)}
        sx={{
          width: "100%",
          justifyContent: align === "right" ? "flex-end" : "flex-start",
        }}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );
}

export function CustomersTable({
  customers,
  sortBy,
  sortDirection,
  onSortChange,
}: CustomersTableProps) {
  return (
    <TableContainer>
      <Table aria-label="Customers" sx={{ minWidth: 1120 }}>
        <TableHead>
          <TableRow>
            <SortableHeader
              field="companyName"
              label="Customer"
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortChange={onSortChange}
            />

            <TableCell>Status</TableCell>

            <SortableHeader
              field="healthScore"
              label="Health"
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortChange={onSortChange}
            />

            <TableCell>Plan</TableCell>

            <SortableHeader
              field="monthlyRecurringRevenue"
              label="MRR"
              align="right"
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortChange={onSortChange}
            />

            <TableCell>Owner</TableCell>

            <SortableHeader
              field="renewalDate"
              label="Renewal"
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortChange={onSortChange}
            />

            <TableCell>Last activity</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {customers.map((customer) => (
            <TableRow
              key={customer.id}
              hover
              sx={{
                "&:last-child td": {
                  borderBottom: 0,
                },
              }}
            >
              <TableCell>
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 38,
                      height: 38,
                      fontSize: 13,
                      color: "primary.main",
                      bgcolor:
                        "color-mix(in srgb, var(--mui-palette-primary-main) 10%, transparent)",
                    }}
                  >
                    {getInitials(customer.companyName)}
                  </Avatar>

                  <Stack spacing={0.25}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {customer.companyName}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      {customer.domain}
                    </Typography>
                  </Stack>
                </Stack>
              </TableCell>

              <TableCell>
                <Chip
                  size="small"
                  color={STATUS_COLORS[customer.status]}
                  label={formatLabel(customer.status)}
                  variant="outlined"
                />
              </TableCell>

              <TableCell>
                <Chip
                  size="small"
                  color={HEALTH_COLORS[customer.healthStatus]}
                  label={`${customer.healthScore} · ${formatLabel(
                    customer.healthStatus,
                  )}`}
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>

              <TableCell>{formatLabel(customer.plan)}</TableCell>

              <TableCell align="right">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {currencyFormatter.format(customer.monthlyRecurringRevenue)}
                </Typography>
              </TableCell>

              <TableCell>{customer.owner.name}</TableCell>

              <TableCell>
                {dateFormatter.format(new Date(customer.renewalDate))}
              </TableCell>

              <TableCell>
                {dateFormatter.format(new Date(customer.lastActivityAt))}
              </TableCell>

              <TableCell align="right">
                <Tooltip title="View customer">
                  <IconButton
                    component={Link}
                    href={`/customers/${customer.id}`}
                    size="small"
                    aria-label={`View ${customer.companyName}`}
                  >
                    <ArrowForwardRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function CustomersTableSkeleton() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 1120 }}>
        <TableHead>
          <TableRow>
            {Array.from({ length: 9 }).map((_, index) => (
              <TableCell key={index}>
                <Skeleton width={72} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.from({ length: 8 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: 9 }).map((_, cellIndex) => (
                <TableCell key={cellIndex}>
                  <Skeleton width={cellIndex === 0 ? 150 : 80} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
