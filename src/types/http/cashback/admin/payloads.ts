import { BatchMethodRequest, MetadataType } from "@medusajs/framework/types";

export interface AdminCreateCashback {
  variant_id: string;
  amounts: AdminCreateCashbackAmount[];
  is_active?: boolean;
  metadata?: MetadataType;
}

export interface AdminCreateCashbackAmount {
  currency_code: string;
  amount: number;
  is_active?: boolean;
  metadata?: MetadataType;
}

export interface AdminCreateCashbackAccount {
  customer_id: string;
  currency_code: string;
  is_active?: boolean;
  metadata?: MetadataType;
}

export interface AdminUpdateCashback {
  is_active?: boolean;
  metadata?: MetadataType;
}

export interface AdminUpdateCashbackAmount {
  currency_code?: string;
  amount?: number;
  metadata?: MetadataType;
}

export interface AdminUpdateCashbackAccount {
  is_active?: boolean;
  metadata?: MetadataType;
}

export interface AdminRedeemCashback {
  order_id: string;
  amount: number;
}

export interface AdminAdjustmentCashbackAccountBalance {
  amount: number;
}

export interface AdminBatchUpdateCashbackAmount
  extends AdminUpdateCashbackAmount {
  id: string;
}

export interface AdminBatchCashbackAmountRequest
  extends BatchMethodRequest<
    AdminCreateCashbackAmount,
    AdminBatchUpdateCashbackAmount
  > {}
