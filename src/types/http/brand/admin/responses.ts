import { DeleteResponse, PaginatedResponse } from "@medusajs/types";
import { BrandDTO } from "@/types/brand";

export interface AdminBrandResponse {
  brand: BrandDTO;
}

export type AdminBrandListReponse = PaginatedResponse<{
  brands: BrandDTO[];
}>;

export interface AdminBrandDeleteReponse extends DeleteResponse<"brand"> {}
