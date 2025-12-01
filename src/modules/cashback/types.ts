import { InferTypeOf } from "@medusajs/framework/types";
import {
  Cashback,
  CashbackAccount,
  CashbackAmount,
  CashbackTransaction,
} from "./models";

export type Cashback = InferTypeOf<typeof Cashback>;
export type CashbackAmount = InferTypeOf<typeof CashbackAmount>;
export type CashbackAccount = InferTypeOf<typeof CashbackAccount>;
export type CashbackTransaction = InferTypeOf<typeof CashbackTransaction>;
