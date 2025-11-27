import {
  AdminBatchCashbackAmountRequest,
  AdminBatchCashbackAmountResponse,
  AdminCashbackListResponse,
  AdminCashbackParams,
  AdminCashbackResponse,
  AdminCreateCashback,
  AdminUpdateCashback,
} from "../../../types/http";
import { queryKeysFactory } from "../../lib/query-key-factory";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { FetchError } from "@medusajs/js-sdk";
import { sdk } from "../../lib/sdk";

const CASHBACKS_QUERY_KEY = "cashbacks" as const;
export const cashbackQueryKeys = queryKeysFactory(CASHBACKS_QUERY_KEY);

export const useCashback = (
  id: string,
  query?: AdminCashbackParams,
  options?: Omit<
    UseMutationOptions<
      AdminCashbackResponse,
      FetchError,
      AdminCashbackResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  const { data, ...rest } = useQuery({
    queryKey: cashbackQueryKeys.detail(id),
    queryFn: () =>
      sdk.client.fetch<AdminCashbackResponse>(`/admin/cashbacks/${id}`, {
        query,
      }),
    ...options,
  });

  return { ...data, ...rest };
};

export const useCashbacks = (
  query?: AdminCashbackParams,
  options?: Omit<
    UseQueryOptions<
      AdminCashbackListResponse,
      FetchError,
      AdminCashbackListResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  const { data, ...rest } = useQuery({
    queryKey: cashbackQueryKeys.list(query),
    queryFn: () =>
      sdk.client.fetch<AdminCashbackListResponse>("/admin/cashbacks", {
        query,
      }),
    ...options,
  });
  return { ...data, ...rest };
};

export const useCreateCashback = (
  options?: UseMutationOptions<
    AdminCashbackResponse,
    FetchError,
    AdminCreateCashback
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch("/admin/cashbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: cashbackQueryKeys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateCashback = (
  id: string,
  options?: UseMutationOptions<
    AdminCashbackResponse,
    FetchError,
    AdminUpdateCashback
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch<AdminCashbackResponse>(`/admin/cashbacks/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: cashbackQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: cashbackQueryKeys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useBatchCashbackAmounts = (
  id: string,
  options?: UseMutationOptions<
    AdminBatchCashbackAmountResponse,
    FetchError,
    AdminBatchCashbackAmountRequest
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/admin/cashbacks/${id}/amounts/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: cashbackQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: cashbackQueryKeys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
