import {
  FilterableCashbackAccountProps,
  FilterableCashbackAmountProps,
  FilterableCashbackProps,
  FilterableCashbackTransactionProps,
} from "@/types/cashback";
import { FindParams } from "@medusajs/framework/types";

export interface AdminCashbackParams
  extends FindParams,
    FilterableCashbackProps {}

export interface AdminCashbackAmountParams
  extends FindParams,
    FilterableCashbackAmountProps {}

export interface AdminCashbackAccountParams
  extends FindParams,
    FilterableCashbackAccountProps {}

export interface AdminCashbackTransactionParams
  extends FindParams,
    FilterableCashbackTransactionProps {}
