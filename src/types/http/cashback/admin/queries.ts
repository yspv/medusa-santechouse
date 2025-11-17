import {
  FilterableCashbackAmountProps,
  FilterableCashbackProps,
} from "@/types/cashback";
import { FindParams } from "@medusajs/framework/types";

export interface AdminCashbackParams
  extends FindParams,
    FilterableCashbackProps {}

export interface AdminCashbackAmountParams
  extends FindParams,
    FilterableCashbackAmountProps {}
