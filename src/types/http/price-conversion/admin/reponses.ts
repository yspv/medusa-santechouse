import { AdminPriceConversion } from "./entities";
import { PaginatedResponse } from "@medusajs/framework/types";

export interface AdminPriceConversionResponse {
  transaction_id: string;
}

export interface AdminPriceConversionListResponse
  extends PaginatedResponse<{ price_conversions: AdminPriceConversion[] }> {}
