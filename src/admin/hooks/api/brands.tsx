import * as HttpTypes from "../../../types/http";
import { queryKeysFactory } from "../../lib/query-key-factory";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { FetchError } from "@medusajs/js-sdk";
import { sdk } from "../../lib/sdk";

const BRANDS_QUERY_KEY = "brands" as const;
export const brandsQueryKeys = queryKeysFactory(BRANDS_QUERY_KEY);

export const useBrand = (
  id: string,
  query?: HttpTypes.AdminBrandParams,
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
      sdk.client.fetch<HttpTypes.AdminBrandResponse>(`/admin/brands/${id}`, {
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
  const queryClient = useQueryClient();
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
  const queryClient = useQueryClient();
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
  options?: UseMutationOptions<
    HttpTypes.AdminBrandDeleteReponse,
    FetchError,
    void
  >,
) => {
  const queryClient = useQueryClient();
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

export const useBrandImages = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      { brand_images: any[] },
      FetchError,
      { brand_images: any[] },
      QueryKey
    >,
    "queryFn" | "queryKey"
  >,
) => {
  const { data, ...rest } = useQuery({
    queryKey: [...brandsQueryKeys.detail(id), "images"],
    queryFn: () =>
      sdk.client.fetch<{ brand_images: any[] }>(`/admin/brands/${id}/images`),
    ...options,
  });
  return { ...data, ...rest };
};

export const useCreateBrandImages = (
  id: string,
  options?: UseMutationOptions<
    { brand_images: any[] },
    FetchError,
    { images: { type: string; url: string; file_id: string }[] }
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/admin/brands/${id}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [...brandsQueryKeys.detail(id), "images"],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateBrandImages = (
  id: string,
  options?: UseMutationOptions<
    { brand_images: any[] },
    FetchError,
    { updates: { id: string; type: string }[] }
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/admin/brands/${id}/images/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [...brandsQueryKeys.detail(id), "images"],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useDeleteBrandImages = (
  id: string,
  options?: UseMutationOptions<{ deleted: string[] }, FetchError, { ids: string[] }>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/admin/brands/${id}/images/batch`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: payload,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [...brandsQueryKeys.detail(id), "images"],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
