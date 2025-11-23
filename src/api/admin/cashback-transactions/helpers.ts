import { AdminCashbackTransaction, CashbackTransactionDTO } from "@/types";
import { remapCashbackAccountResponse } from "../cashback-accounts/helpers";

export const remapCashbackTransactionResponse = (
  transaction: CashbackTransactionDTO,
): AdminCashbackTransaction => {
  return {
    ...transaction,
    account: transaction.account
      ? remapCashbackAccountResponse(transaction.account)
      : undefined,
  };
};
