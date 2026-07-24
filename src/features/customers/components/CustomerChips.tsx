import Chip, { type ChipProps } from "@mui/material/Chip";

import type {
  CustomerHealthStatus,
  CustomerStatus,
} from "@/features/customers/types/customer";
import { formatCustomerLabel } from "@/features/customers/utils/customer-formatters";

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

interface CustomerStatusChipProps {
  status: CustomerStatus;
}

interface CustomerHealthChipProps {
  status: CustomerHealthStatus;
  score: number;
}

export function CustomerStatusChip({ status }: CustomerStatusChipProps) {
  return (
    <Chip
      size="small"
      color={STATUS_COLORS[status]}
      label={formatCustomerLabel(status)}
      variant="outlined"
    />
  );
}

export function CustomerHealthChip({ status, score }: CustomerHealthChipProps) {
  return (
    <Chip
      size="small"
      color={HEALTH_COLORS[status]}
      label={`${score} · ${formatCustomerLabel(status)}`}
      sx={{ fontWeight: 600 }}
    />
  );
}
