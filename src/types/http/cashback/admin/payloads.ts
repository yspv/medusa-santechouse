import { MetadataType } from "@medusajs/framework/types";

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
