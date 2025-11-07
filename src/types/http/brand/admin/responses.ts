import { DeleteResponse, PaginatedResponse } from "@medusajs/types";
import { AdminBrand } from "./entities";

export interface AdminBrandResponse {
  brand: AdminBrand;
}

export type AdminBrandListReponse = PaginatedResponse<{
  brands: AdminBrand[];
}>;

export interface AdminBrandDeleteReponse extends DeleteResponse<"brand"> {}
