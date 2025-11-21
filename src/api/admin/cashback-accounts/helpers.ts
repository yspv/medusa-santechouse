import {
  AdminCashbackAccount,
  AdminCashbackTransaction,
  CashbackAccountDTO,
  CashbackTransactionDTO,
} from "@/types";
import { CustomerDTO } from "@medusajs/framework/types";

export const remapCashbackAccountResponse = (
  account: CashbackAccountDTO,
): AdminCashbackAccount => {
  return {
    ...account,
  };
};

export const remapCashbackTransactionResponse = (
  transaction: CashbackTransactionDTO,
): AdminCashbackTransaction => {
  return {
    ...transaction,
  };
};
