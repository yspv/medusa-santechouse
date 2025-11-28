import { queryKeysFactory } from "@/lib/query-key-factory";
import {
  AdminCashbackAccountListResponse,
  AdminCashbackAccountParams,
  AdminCashbackAccountResponse,
} from "@/types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { FetchError } from "@medusajs/js-sdk";
import { sdk } from "@/lib/sdk";

const CASHBACK_ACCOUNTS_QUERY_KEY = "cashback_account";
export const cashbackAccountQueryKeys = queryKeysFactory(
  CASHBACK_ACCOUNTS_QUERY_KEY,
);

export const useCashbackAccounts = (
  query?: AdminCashbackAccountParams,
  options?: Omit<
    UseQueryOptions<
      AdminCashbackAccountListResponse,
      FetchError,
      AdminCashbackAccountListResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  const { data, ...rest } = useQuery({
    queryKey: cashbackAccountQueryKeys.list(query),
    queryFn: () =>
      sdk.client.fetch<AdminCashbackAccountListResponse>(
        `/admin/cashback-accounts`,
        { query },
      ),
    ...options,
  });
  return { ...data, ...rest };
};

export const useCashbackAccount = (
  id: string,
  query?: AdminCashbackAccountParams,
  options?: Omit<
    UseQueryOptions<
      AdminCashbackAccountResponse,
      FetchError,
      AdminCashbackAccountResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >,
) => {
  const { data, ...rest } = useQuery({
    queryKey: cashbackAccountQueryKeys.detail(id),
    queryFn: () =>
      sdk.client.fetch<AdminCashbackAccountResponse>(
        `/admin/cashback-accounts/${id}`,
        { query },
      ),
    ...options,
  });

  return { ...data, ...rest };
};
