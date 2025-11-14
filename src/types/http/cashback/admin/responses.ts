import { DeleteResponse, PaginatedResponse } from "@medusajs/framework/types";
import { AdminCashback } from "./entities";

export interface AdminCashbackResponse {
  cashback: AdminCashback;
}

export interface AdminCashbackListResponse
  extends PaginatedResponse<{ cashbacks: AdminCashback[] }> {}

export interface AdminCashbackDeleteResponse
  extends DeleteResponse<"cashback"> {}
