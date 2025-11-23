import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { queryKeysFactory } from "@/lib/query-key-factory";
import {
  AdminPriceConversionListResponse,
  AdminPriceConversionParams,
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
