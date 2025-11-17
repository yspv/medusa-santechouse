import { DeleteResponse, PaginatedResponse } from "@medusajs/framework/types";
import { AdminCashback, AdminCashbackAmount } from "./entities";

export interface AdminCashbackResponse {
  cashback: AdminCashback;
}

export interface AdminCashbackListResponse
  extends PaginatedResponse<{ cashbacks: AdminCashback[] }> {}

export interface AdminCashbackDeleteResponse
  extends DeleteResponse<"cashback"> {}

export interface AdminCashbackAmountResponse {
  cashback_amount: AdminCashbackAmount;
}

export interface AdminCashbackAmountListResponse
  extends PaginatedResponse<{ cashback_amounts: AdminCashbackAmount[] }> {}

export interface AdminCashbackAmountDeleteResponse
  extends DeleteResponse<"cashback_amount"> {}
