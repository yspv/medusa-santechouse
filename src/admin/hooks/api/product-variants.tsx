import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { queryKeysFactory } from "@/lib/query-key-factory";
import { FetchError } from "@medusajs/js-sdk";
import { sdk } from "@/lib/sdk";
import { HttpTypes } from "@medusajs/framework/types";

const PRODUCT_VARIANT_QUERY_KEY = "product_variant" as const;
export const productVariantQueryKeys = queryKeysFactory(
  PRODUCT_VARIANT_QUERY_KEY,
);

export const useVariants = (
  query?: HttpTypes.AdminProductVariantParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminProductVariantListResponse,
      FetchError,
      HttpTypes.AdminProductVariantListResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >,
) => {
  const { data, ...rest } = useQuery({
    queryFn: () => sdk.admin.productVariant.list(query),
    queryKey: productVariantQueryKeys.list(query),
    ...options,
  });

  return { ...data, ...rest };
};
