import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CashbackAccount } from "../../../../.medusa/types/query-entry-points";
import { MedusaError } from "@medusajs/framework/utils";

export type ValidateCashbackAccountBalanceStepInput = {
  account: CashbackAccount;
  amount: number;
};
export const validateCashbackAccountBalanceStepId =
  "validate-cashback-account-balance";
export const validateCashbackAccountBalanceStep = createStep(
  validateCashbackAccountBalanceStepId,
  ({ account, amount }: ValidateCashbackAccountBalanceStepInput) => {
    if (amount < 0 || amount > account.balance) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Required amount greater than amount in cashback acccount balance",
      );
    }
    return new StepResponse(void 0);
  },
);
