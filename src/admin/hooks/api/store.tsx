import { HttpTypes } from "@medusajs/framework/types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { FetchError } from "@medusajs/js-sdk";
import { queryKeysFactory } from "@/lib/query-key-factory";
import { sdk } from "@/lib/sdk";

const STORE_QUERY_KEY = "store";
export const storeQueryKeys = queryKeysFactory(STORE_QUERY_KEY);

export async function retrieveActiveStore(
  query?: HttpTypes.AdminStoreParams,
): Promise<HttpTypes.AdminStoreResponse> {
  const response = await sdk.admin.store.list(query);

  const activeStore = response.stores?.[0];

  if (!activeStore) {
    throw new FetchError("No active store found", "Not Found", 404);
  }

  return { store: activeStore };
}

export const useStore = (
  query?: HttpTypes.SelectParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminStoreResponse,
      FetchError,
      HttpTypes.AdminStoreResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  const { data, ...rest } = useQuery({
    queryKey: storeQueryKeys.list(query),
    queryFn: () => retrieveActiveStore(query),
    ...options,
  });

  return { ...data, ...rest };
};
