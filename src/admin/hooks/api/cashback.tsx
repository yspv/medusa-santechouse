import {
  AdminCashbackListResponse,
  AdminCashbackParams,
} from "../../../types/http";
import { queryKeysFactory } from "../../lib/query-key-factory";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { FetchError } from "@medusajs/js-sdk";
import { sdk } from "../../lib/sdk";

const CASHBACKS_QUERY_KEY = "cashbacks";
export const cashbackQueryKeys = queryKeysFactory(CASHBACKS_QUERY_KEY);

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
