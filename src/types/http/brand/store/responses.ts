import { StoreBrand } from "./entities";
import { PaginatedResponse } from "@medusajs/types";

export interface StoreBrandResponse {
  brand: StoreBrand;
}

export interface StoreBrandListResponse extends PaginatedResponse<{
  brands: StoreBrand[];
}> {}
