"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { CustomersFilters } from "@/features/customers/components/CustomersFilters";
import { useCustomerListUrlState } from "@/features/customers/hooks/use-customer-list-url-state";
import type {
  CustomerListParams,
  CustomerSortField,
  SortDirection,
} from "@/features/customers/types/customer";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import { CustomersMobileList } from "@/features/customers/components/CustomersMobileList";

import {
  CustomersTable,
  CustomersTableSkeleton,
} from "@/features/customers/components/CustomersTable";
import { useCustomers } from "@/features/customers/hooks/use-customers";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";

const PAGE_SIZE = 10;

function getInitialSortDirection(field: CustomerSortField): SortDirection {
  if (field === "monthlyRecurringRevenue") {
    return "desc";
  }

  return "asc";
}

export function CustomersPageContent() {
  const { state, updateState, clearFilters, hasActiveFilters } =
    useCustomerListUrlState();

  const [searchValue, setSearchValue] = useState(state.query);
  const [previousQuery, setPreviousQuery] = useState(state.query);
  const debouncedSearchValue = useDebouncedValue(searchValue);

  if (state.query !== previousQuery) {
    setPreviousQuery(state.query);
    setSearchValue(state.query);
  }

  useEffect(() => {
    if (debouncedSearchValue === state.query) {
      return;
    }

    updateState(
      {
        query: debouncedSearchValue || null,
      },
      {
        resetPage: true,
      },
    );
  }, [debouncedSearchValue, state.query, updateState]);

  const params = useMemo<CustomerListParams>(
    () => ({
      query: state.query,
      statuses: state.status ? [state.status] : undefined,
      healthStatuses: state.healthStatus ? [state.healthStatus] : undefined,
      segments: state.segment ? [state.segment] : undefined,

      sortBy: state.sortBy,
      sortDirection: state.sortDirection,

      page: state.page,
      pageSize: PAGE_SIZE,
    }),
    [state],
  );

  const { data, error, isError, isFetching, isPending, refetch } =
    useCustomers(params);

  useEffect(() => {
    if (!data || data.page === state.page) {
      return;
    }

    updateState({
      page: data.page,
    });
  }, [data, state.page, updateState]);

  const handleSortChange = (field: CustomerSortField) => {
    const nextDirection =
      state.sortBy === field
        ? state.sortDirection === "asc"
          ? "desc"
          : "asc"
        : getInitialSortDirection(field);

    updateState(
      {
        sortBy: field,
        sortDirection: nextDirection,
      },
      {
        resetPage: true,
      },
    );
  };

  return (
    <Stack spacing={3}>
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
        <Stack spacing={0.5}>
          <Typography variant="h1">Customers</Typography>

          <Typography color="text.secondary">
            Search, filter, and manage your customer accounts.
          </Typography>
        </Stack>

        <Button
          component={Link}
          href="/customers/new"
          variant="contained"
          startIcon={<AddRoundedIcon />}
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          Add customer
        </Button>
      </Stack>

      <Card
        sx={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isFetching && !isPending && (
          <LinearProgress
            aria-label="Refreshing customers"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              zIndex: 1,
            }}
          />
        )}

        <CustomersFilters
          searchValue={searchValue}
          status={state.status}
          healthStatus={state.healthStatus}
          segment={state.segment}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={setSearchValue}
          onStatusChange={(status) =>
            updateState({ status }, { resetPage: true })
          }
          onHealthStatusChange={(healthStatus) =>
            updateState({ healthStatus }, { resetPage: true })
          }
          onSegmentChange={(segment) =>
            updateState({ segment }, { resetPage: true })
          }
          onClear={clearFilters}
        />

        {isPending && <CustomersTableSkeleton />}

        {isError && (
          <Box sx={{ p: 3 }}>
            <Alert
              severity="error"
              action={
                <Button color="inherit" size="small" onClick={() => refetch()}>
                  Retry
                </Button>
              }
            >
              {error instanceof Error
                ? error.message
                : "Unable to load customers."}
            </Alert>
          </Box>
        )}

        {data && data.totalItems === 0 && (
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
              minHeight: 320,
              p: 4,
              textAlign: "center",
            }}
            spacing={1}
          >
            <SearchOffRoundedIcon
              sx={{
                fontSize: 44,
                color: "text.disabled",
              }}
            />

            <Typography variant="h3" component="p">
              No customers found
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Try changing or clearing your search.
            </Typography>
          </Stack>
        )}

        {data && data.totalItems > 0 && (
          <>
            <CustomersTable
              customers={data.data}
              sortBy={state.sortBy}
              sortDirection={state.sortDirection}
              onSortChange={handleSortChange}
            />

            <CustomersMobileList customers={data.data} />

            <TablePagination
              component="div"
              count={data.totalItems}
              page={data.page - 1}
              rowsPerPage={data.pageSize}
              rowsPerPageOptions={[PAGE_SIZE]}
              onPageChange={(_, nextPage) => {
                updateState({
                  page: nextPage + 1,
                });
              }}
              onRowsPerPageChange={() => undefined}
            />
          </>
        )}
      </Card>
    </Stack>
  );
}
