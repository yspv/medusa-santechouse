import { AdminPriceConversion } from "./entities";
import { PaginatedResponse } from "@medusajs/framework/types";

export interface AdminPriceConversionResponse {
  price_conversion: AdminPriceConversion;
}

export interface AdminPriceConversionListResponse
  extends PaginatedResponse<{ price_conversions: AdminPriceConversion[] }> {}
