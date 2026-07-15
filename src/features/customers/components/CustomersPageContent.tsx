"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  CustomersTable,
  CustomersTableSkeleton,
} from "@/features/customers/components/CustomersTable";
import { useCustomers } from "@/features/customers/hooks/use-customers";
import type { CustomerListParams } from "@/features/customers/types/customer";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";

const PAGE_SIZE = 10;

export function CustomersPageContent() {
  const [searchValue, setSearchValue] = useState("");

  const [page, setPage] = useState(1);

  const debouncedSearchValue = useDebouncedValue(searchValue);

  const params = useMemo<CustomerListParams>(
    () => ({
      query: debouncedSearchValue,
      page,
      pageSize: PAGE_SIZE,
      sortBy: "companyName",
      sortDirection: "asc",
    }),
    [debouncedSearchValue, page],
  );

  const { data, error, isError, isFetching, isPending, refetch } =
    useCustomers(params);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setPage(1);
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

        <Box
          sx={{
            p: 2.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <TextField
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search company, domain, or contact"
            aria-label="Search customers"
            sx={{
              width: {
                xs: "100%",
                sm: 360,
              },
            }}
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
        </Box>

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
            <CustomersTable customers={data.data} />

            <TablePagination
              component="div"
              count={data.totalItems}
              page={data.page - 1}
              rowsPerPage={data.pageSize}
              rowsPerPageOptions={[PAGE_SIZE]}
              onPageChange={(_, nextPage) => {
                setPage(nextPage + 1);
              }}
              onRowsPerPageChange={() => undefined}
            />
          </>
        )}
      </Card>
    </Stack>
  );
}
