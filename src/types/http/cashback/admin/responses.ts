import {
  BatchResponse,
  DeleteResponse,
  PaginatedResponse,
} from "@medusajs/framework/types";
import {
  AdminCashback,
  AdminCashbackAccount,
  AdminCashbackAmount,
  AdminCashbackTransaction,
} from "./entities";

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

export interface AdminCashbackAccountListResponse
  extends PaginatedResponse<{
    cashback_accounts: AdminCashbackAccount[];
  }> {}

export interface AdminCashbackAccountResponse {
  cashback_account: AdminCashbackAccount;
}

export interface AdminCashbackAccountDeleteResponse
  extends DeleteResponse<"cashback_account"> {}

export interface AdminCashbackTransactionResponse {
  cashback_transaction: AdminCashbackTransaction;
}

export interface AdminCashbackTransactionListResponse
  extends PaginatedResponse<{
    cashback_transactions: AdminCashbackTransaction[];
  }> {}

export interface AdminBatchCashbackAmountResponse
  extends BatchResponse<AdminCashbackAmount> {}
