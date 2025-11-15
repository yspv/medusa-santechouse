import { MetadataType } from "@medusajs/framework/types";
import { CashbackTransactionType } from "./common";

export interface CreateCashbackDTO {
  amounts?: CreateCashbackAmountDTO[];
  is_active?: boolean;
  metadata?: MetadataType;
}

export interface CreateCashbackAmountDTO {
  cashback_id?: string;
  currency_code: string;
  amount: number;
  is_active?: boolean;
  metadata?: MetadataType;
}

export interface CreateCashbackAccountDTO {
  currency_code: string;
  total_earned?: number;
  total_redeemed?: number;
  balance?: number;
  is_active?: boolean;
  metadata?: MetadataType;
}

export interface CreateCashbackTransactionDTO {
  account_id: string;
  reference_id?: string;
  type: CashbackTransactionType;
  currency_code: string;
  amount: number;
  metadata: MetadataType;
}

export interface UpdateCashbackDTO {
  id: string;
  is_active?: boolean;
  metadata?: MetadataType;
}

export interface UpdateCashbackAmountDTO {
  id: string;
  currency_code?: string;
  amount?: number;
  is_active?: boolean;
  metadata?: MetadataType;
}

export interface UpdateCashbackAccountDTO {
  id: string;
  currency_code?: string;
  total_earned?: number;
  total_redeemed?: number;
  balance?: number;
  is_active?: boolean;
  metadata?: MetadataType;
}
