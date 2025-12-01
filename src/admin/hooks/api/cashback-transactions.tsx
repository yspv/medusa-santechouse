import { queryKeysFactory } from "@/lib/query-key-factory";
import {
  AdminCashbackTransactionListResponse,
  AdminCashbackTransactionParams,
  AdminCashbackTransactionResponse,
  AdminRedeemCashback,
} from "@/types";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { FetchError } from "@medusajs/js-sdk";
import { sdk } from "@/lib/sdk";
import { cashbackAccountQueryKeys } from "./cashback-accounts";

const CASHBACK_TRANSACTIONS_QUERY_KEY = "cashback_transactions";
export const cashbackTrasactionQueryKeys = queryKeysFactory(
  CASHBACK_TRANSACTIONS_QUERY_KEY,
);
const orderQueryKeys = queryKeysFactory("orders");

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

export const useRedeemCashbackTransaction = (
  options?: UseMutationOptions<
    AdminCashbackTransactionResponse,
    FetchError,
    AdminRedeemCashback
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch("/admin/cashback-transactions/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.details(),
      });
      queryClient.invalidateQueries({
        queryKey: cashbackTrasactionQueryKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: cashbackAccountQueryKeys.detail(
          data.cashback_transaction.account_id as string,
        ),
      });
      queryClient.invalidateQueries({
        queryKey: cashbackAccountQueryKeys.lists(),
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
