"use client";

import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import {
  CUSTOMER_HEALTH_STATUSES,
  CUSTOMER_SEGMENTS,
  CUSTOMER_STATUSES,
  type CustomerHealthStatus,
  type CustomerSegment,
  type CustomerStatus,
} from "@/features/customers/types/customer";

interface CustomersFiltersProps {
  searchValue: string;
  status: CustomerStatus | null;
  healthStatus: CustomerHealthStatus | null;
  segment: CustomerSegment | null;
  hasActiveFilters: boolean;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: CustomerStatus | null) => void;
  onHealthStatusChange: (value: CustomerHealthStatus | null) => void;
  onSegmentChange: (value: CustomerSegment | null) => void;
  onClear: () => void;
}

function formatLabel(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function CustomersFilters({
  searchValue,
  status,
  healthStatus,
  segment,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onHealthStatusChange,
  onSegmentChange,
  onClear,
}: CustomersFiltersProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 1fr)",
          sm: "repeat(2, minmax(0, 1fr))",
          xl: `
            minmax(280px, 1.6fr)
            repeat(3, minmax(150px, 1fr))
            auto
          `,
        },
        gap: 1.5,
        p: 2.5,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <TextField
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search company, domain, or contact"
        aria-label="Search customers"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          },
        }}
      />

      <FormControl size="small">
        <InputLabel id="customer-status-label">Status</InputLabel>

        <Select
          labelId="customer-status-label"
          value={status ?? ""}
          label="Status"
          onChange={(event: SelectChangeEvent) => {
            onStatusChange(
              (event.target.value || null) as CustomerStatus | null,
            );
          }}
        >
          <MenuItem value="">All statuses</MenuItem>

          {CUSTOMER_STATUSES.map((value) => (
            <MenuItem key={value} value={value}>
              {formatLabel(value)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel id="customer-health-label">Health</InputLabel>

        <Select
          labelId="customer-health-label"
          value={healthStatus ?? ""}
          label="Health"
          onChange={(event: SelectChangeEvent) => {
            onHealthStatusChange(
              (event.target.value || null) as CustomerHealthStatus | null,
            );
          }}
        >
          <MenuItem value="">All health statuses</MenuItem>

          {CUSTOMER_HEALTH_STATUSES.map((value) => (
            <MenuItem key={value} value={value}>
              {formatLabel(value)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel id="customer-segment-label">Segment</InputLabel>

        <Select
          labelId="customer-segment-label"
          value={segment ?? ""}
          label="Segment"
          onChange={(event: SelectChangeEvent) => {
            onSegmentChange(
              (event.target.value || null) as CustomerSegment | null,
            );
          }}
        >
          <MenuItem value="">All segments</MenuItem>

          {CUSTOMER_SEGMENTS.map((value) => (
            <MenuItem key={value} value={value}>
              {formatLabel(value)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="text"
        startIcon={<FilterAltOffRoundedIcon />}
        disabled={!hasActiveFilters}
        onClick={onClear}
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        Clear
      </Button>
    </Box>
  );
}
