import {
  ProductVariantDTO,
  MetadataType,
  CustomerDTO,
  BaseFilterable,
  FilterableProductVariantProps,
  FilterableCustomerProps,
} from "@medusajs/framework/types";

export type CashbackTransactionType = "earned" | "redeemed" | "adjustment";

export interface FilterableCashbackProps
  extends BaseFilterable<FilterableCashbackProps> {
  id?: string | string[];
  is_active?: boolean;
  product_variant?: FilterableProductVariantProps;
}

export interface FilterableCashbackAmountProps
  extends BaseFilterable<FilterableCashbackAmountProps> {
  id?: string | string[];
  currency_code?: string | string[];
  is_active?: boolean;
}

export interface FilterableCashbackAccountProps
  extends BaseFilterable<FilterableCashbackAccountProps> {
  id?: string | string[];
  customer?: FilterableCustomerProps;
  currency_code?: string | string[];
  is_active?: boolean;
}

export interface FilterableCashbackTransactionProps
  extends BaseFilterable<FilterableCashbackTransactionProps> {
  id?: string | string[];
  type?: CashbackTransactionType | CashbackTransactionType[];
  currency_code?: string | string[];
}

export interface CashbackDTO {
  id: string;
  product_variant?: ProductVariantDTO | null;
  amounts: CashbackAmountDTO[];
  is_active: boolean;
  metadata: MetadataType;
}

export interface CashbackAmountDTO {
  id: string;
  cashback?: CashbackDTO;
  currency_code: string;
  amount: number;
  is_active: boolean;
  metadata: MetadataType;
}

export interface CashbackAccountDTO {
  id: string;
  customer?: CustomerDTO;
  transactions: CashbackTransactionDTO[];
  currency_code: string;
  total_earned: number;
  total_redeemed: number;
  balance: number;
  is_active: boolean;
  metadata: MetadataType;
}

export interface CashbackTransactionDTO {
  id: string;
  account?: CashbackAccountDTO;
  cashback?: CashbackDTO;
  currency_code: string;
  amount: number;
  metadata: MetadataType;
}
