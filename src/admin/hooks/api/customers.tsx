import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { FetchError } from "@medusajs/js-sdk";
import {
  AdminCustomerFilters,
  AdminCustomerListResponse,
} from "@medusajs/framework/types";
import { queryKeysFactory } from "@/lib/query-key-factory";
import { sdk } from "@/lib/sdk";

const CUSTOMERS_QUERY_KEY = "customer" as const;
export const customerQueryKeys = queryKeysFactory(CUSTOMERS_QUERY_KEY);

export const useCustomers = (
  query?: AdminCustomerFilters,
  options?: Omit<
    UseQueryOptions<
      AdminCustomerListResponse,
      FetchError,
      AdminCustomerListResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  const { data, ...rest } = useQuery({
    queryKey: customerQueryKeys.list(query),
    queryFn: () => sdk.admin.customer.list(query),
    ...options,
  });

  return { ...data, ...rest };
};
