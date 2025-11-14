import { AdminCustomer, AdminProductVariant } from "@medusajs/framework/types";
import {
  CashbackAccountDTO,
  CashbackAmountDTO,
  CashbackDTO,
  CashbackTransactionDTO,
  CashbackTransactionType,
} from "@/types/cashback";

export type AdminCashback = Omit<CashbackDTO, "amounts" | "product_variant"> & {
  product_variant?: AdminProductVariant;
  amounts: AdminCashbackAmount[] | null;
};

export type AdminCashbackAmount = Omit<CashbackAmountDTO, "cashback"> & {
  cashback?: AdminCashback | null;
};

export type AdminCashbackAccount = Omit<
  CashbackAccountDTO,
  "customer" | "transactions"
> & {
  customer?: AdminCustomer | null;
  transactions?: AdminCashbackTransaction[] | null;
};

export type AdminCashbackTransactionType = CashbackTransactionType;
export type AdminCashbackTransaction = CashbackTransactionDTO;
