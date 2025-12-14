import { StoreLocaleProduct } from "./entites";
import { PaginatedResponse } from "@medusajs/framework/types";

export interface StoreLocaleProductResponse {
  product: StoreLocaleProduct;
}

export interface StoreLocaleProductListResponse extends PaginatedResponse<{
  products: StoreLocaleProduct[];
}> {}
