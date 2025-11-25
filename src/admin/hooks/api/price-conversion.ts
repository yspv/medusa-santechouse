import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { queryKeysFactory } from "@/lib/query-key-factory";
import {
  AdminPriceConversionInput,
  AdminPriceConversionListResponse,
  AdminPriceConversionParams,
  AdminPriceConversionResponse,
} from "@/types";
import { FetchError } from "@medusajs/js-sdk";
import { sdk } from "@/lib/sdk";

const PRICE_CONVERSIONS_QUERY_KEY = "price_conversion";
export const priceConversionQueryKeys = queryKeysFactory(
  PRICE_CONVERSIONS_QUERY_KEY,
);

export const usePriceConversions = (
  query?: AdminPriceConversionParams,
  options?: Omit<
    UseQueryOptions<
      AdminPriceConversionListResponse,
      FetchError,
      AdminPriceConversionListResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  const { data, ...rest } = useQuery({
    queryKey: priceConversionQueryKeys.list(query),
    queryFn: () =>
      sdk.client.fetch<AdminPriceConversionListResponse>(
        "/admin/price-conversions",
        { query },
      ),
    ...options,
  });
  return { ...data, ...rest };
};

export const useCreatePriceConversion = (
  options?: UseMutationOptions<
    AdminPriceConversionResponse,
    FetchError,
    AdminPriceConversionInput
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch("/admin/price-conversions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: priceConversionQueryKeys.lists(),
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useConfirmPriceConversion = (
  transactionId: string,
  options?: UseMutationOptions<unknown, FetchError, unknown>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/admin/price-conversions/${transactionId}/confirm`),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: priceConversionQueryKeys.lists(),
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
