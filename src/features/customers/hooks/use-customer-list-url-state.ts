"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  CUSTOMER_HEALTH_STATUSES,
  CUSTOMER_SEGMENTS,
  CUSTOMER_STATUSES,
  type CustomerHealthStatus,
  type CustomerSegment,
  type CustomerSortField,
  type CustomerStatus,
  type SortDirection,
} from "@/features/customers/types/customer";

const SORT_FIELDS = [
  "companyName",
  "healthScore",
  "monthlyRecurringRevenue",
  "renewalDate",
] as const satisfies readonly CustomerSortField[];

const SORT_DIRECTIONS = [
  "asc",
  "desc",
] as const satisfies readonly SortDirection[];

export const DEFAULT_SORT_FIELD: CustomerSortField = "companyName";

export const DEFAULT_SORT_DIRECTION: SortDirection = "asc";

interface CustomerListUrlState {
  query: string;
  status: CustomerStatus | null;
  healthStatus: CustomerHealthStatus | null;
  segment: CustomerSegment | null;
  sortBy: CustomerSortField;
  sortDirection: SortDirection;
  page: number;
}

interface CustomerListUrlUpdates {
  query?: string | null;
  status?: CustomerStatus | null;
  healthStatus?: CustomerHealthStatus | null;
  segment?: CustomerSegment | null;
  sortBy?: CustomerSortField | null;
  sortDirection?: SortDirection | null;
  page?: number | null;
}

interface UpdateOptions {
  resetPage?: boolean;
}

function isAllowedValue<T extends string>(
  value: string | null,
  allowedValues: readonly T[],
): value is T {
  return value !== null && allowedValues.includes(value as T);
}

function parsePage(value: string | null): number {
  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : 1;
}

export function useCustomerListUrlState() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const state = useMemo<CustomerListUrlState>(() => {
    const statusValue = searchParams.get("status");

    const healthValue = searchParams.get("health");

    const segmentValue = searchParams.get("segment");

    const sortValue = searchParams.get("sort");
    const orderValue = searchParams.get("order");

    return {
      query: searchParams.get("q") ?? "",

      status: isAllowedValue(statusValue, CUSTOMER_STATUSES)
        ? statusValue
        : null,

      healthStatus: isAllowedValue(healthValue, CUSTOMER_HEALTH_STATUSES)
        ? healthValue
        : null,

      segment: isAllowedValue(segmentValue, CUSTOMER_SEGMENTS)
        ? segmentValue
        : null,

      sortBy: isAllowedValue(sortValue, SORT_FIELDS)
        ? sortValue
        : DEFAULT_SORT_FIELD,

      sortDirection: isAllowedValue(orderValue, SORT_DIRECTIONS)
        ? orderValue
        : DEFAULT_SORT_DIRECTION,

      page: parsePage(searchParams.get("page")),
    };
  }, [searchParams]);

  const updateState = useCallback(
    (updates: CustomerListUrlUpdates, options: UpdateOptions = {}) => {
      const params = new URLSearchParams(searchParams.toString());

      const setOrDelete = (key: string, value: string | null | undefined) => {
        if (value === undefined) {
          return;
        }

        if (!value) {
          params.delete(key);
          return;
        }

        params.set(key, value);
      };

      setOrDelete("q", updates.query?.trim());

      setOrDelete("status", updates.status);
      setOrDelete("health", updates.healthStatus);
      setOrDelete("segment", updates.segment);

      if (updates.sortBy !== undefined) {
        setOrDelete(
          "sort",
          updates.sortBy === DEFAULT_SORT_FIELD ? null : updates.sortBy,
        );
      }

      if (updates.sortDirection !== undefined) {
        setOrDelete(
          "order",
          updates.sortDirection === DEFAULT_SORT_DIRECTION
            ? null
            : updates.sortDirection,
        );
      }

      if (updates.page !== undefined) {
        setOrDelete(
          "page",
          updates.page && updates.page > 1 ? String(updates.page) : null,
        );
      }

      if (options.resetPage) {
        params.delete("page");
      }

      const queryString = params.toString();

      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const clearFilters = useCallback(() => {
    updateState(
      {
        query: null,
        status: null,
        healthStatus: null,
        segment: null,
      },
      {
        resetPage: true,
      },
    );
  }, [updateState]);

  return {
    state,
    updateState,
    clearFilters,

    hasActiveFilters: Boolean(
      state.query || state.status || state.healthStatus || state.segment,
    ),
  };
}
