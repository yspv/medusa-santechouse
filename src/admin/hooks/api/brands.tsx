import * as HttpTypes from "@root/types/http";
import { queryKeysFactory } from "../../lib/query-key-factory";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { FetchError } from "@medusajs/js-sdk";
import { sdk } from "@/lib/sdk";
import { queryClient } from "@/lib/query-client";

const BRANDS_QUERY_KEY = "brands" as const;
export const brandsQueryKeys = queryKeysFactory(BRANDS_QUERY_KEY);

export const useBrand = (
  id: string,
  query: HttpTypes.AdminBrandParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminBrandResponse,
      FetchError,
      HttpTypes.AdminBrandResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >,
) => {
  const { data, ...rest } = useQuery({
    queryKey: brandsQueryKeys.detail(id, query),
    queryFn: () =>
      sdk.client.fetch<HttpTypes.AdminBrandResponse>("/admin/brands", {
        query,
      }),
    ...options,
  });
  return { ...data, ...rest };
};

export const useBrands = (
  query?: HttpTypes.AdminBrandParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminBrandListReponse,
      FetchError,
      HttpTypes.AdminBrandListReponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >,
) => {
  const { data, ...rest } = useQuery({
    queryKey: brandsQueryKeys.list(query),
    queryFn: () =>
      sdk.client.fetch<HttpTypes.AdminBrandListReponse>("/admin/brands", {
        query,
      }),
    ...options,
  });
  return { ...data, ...rest };
};

export const useCreateBrand = (
  options?: UseMutationOptions<
    HttpTypes.AdminBrandResponse,
    FetchError,
    HttpTypes.AdminCreateBrand
  >,
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch("/admin/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: brandsQueryKeys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateBrand = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminBrandResponse,
    FetchError,
    HttpTypes.AdminUpdateBrand
  >,
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/admin/brands/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: brandsQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: brandsQueryKeys.detail(id) });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useDeleteBrand = (
  id: string,
  options: UseMutationOptions<
    HttpTypes.AdminBrandDeleteReponse,
    FetchError,
    void
  >,
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch<HttpTypes.AdminBrandDeleteReponse>(
        `/admin/brands/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      ),

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: brandsQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: brandsQueryKeys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
