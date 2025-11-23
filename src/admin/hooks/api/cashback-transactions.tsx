import { queryKeysFactory } from "@/lib/query-key-factory";
import {
  AdminCashbackTransactionListResponse,
  AdminCashbackTransactionParams,
} from "@/types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { FetchError } from "@medusajs/js-sdk";
import { sdk } from "@/lib/sdk";

const CASHBACK_TRANSACTIONS_QUERY_KEY = "cashback_transactions";
export const cashbackTrasactionQueryKeys = queryKeysFactory(
  CASHBACK_TRANSACTIONS_QUERY_KEY,
);

export const useCashbackTransactions = (
  query?: AdminCashbackTransactionParams,
  options?: Omit<
    UseQueryOptions<
      AdminCashbackTransactionListResponse,
      FetchError,
      AdminCashbackTransactionListResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  const { data, ...rest } = useQuery({
    queryKey: cashbackTrasactionQueryKeys.list(query),
    queryFn: () =>
      sdk.client.fetch<AdminCashbackTransactionListResponse>(
        "/admin/cashback-transactions",
        { query },
      ),
    ...options,
  });
  return { ...data, ...rest };
};
