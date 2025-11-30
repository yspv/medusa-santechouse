import { queryKeysFactory } from "@/lib/query-key-factory";
import {
  AdminCashbackAccountListResponse,
  AdminCashbackAccountParams,
  AdminCashbackAccountResponse,
  AdminUpdateCashbackAccount,
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

export const useUpdateCashbackAccount = (
  id: string,
  options?: UseMutationOptions<
    AdminCashbackAccountResponse,
    FetchError,
    AdminUpdateCashbackAccount
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch<AdminCashbackAccountResponse>(
        `/admin/cashback-accounts/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        },
      ),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: cashbackAccountQueryKeys.detail(id),
      });
      queryClient.invalidateQueries({
        queryKey: cashbackAccountQueryKeys.lists(),
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
