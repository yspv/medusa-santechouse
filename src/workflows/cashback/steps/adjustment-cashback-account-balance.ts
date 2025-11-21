import { CASHBACK_MODULE } from "@/modules/cashback";
import { CashbackTransactionType } from "@/modules/cashback/models";
import { Modules } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export type AdjustmentCashbackAccountBalanceStepInput = {
  account_id: string;
  amount: number;
};

export const adjustmentCashbackAccountBalanceStepId =
  "adjustment-cashback-account-balance";
export const adjustmentCashbackAccountBalanceStep = createStep(
  adjustmentCashbackAccountBalanceStepId,
  async (data: AdjustmentCashbackAccountBalanceStepInput, { container }) => {
    const locking = container.resolve(Modules.LOCKING);
    const service = container.resolve(CASHBACK_MODULE);
    const prevAccount = await service.retrieveCashbackAccount(data.account_id);
    const transaction = await service.createCashbackTransactions({
      account_id: prevAccount.id,
      type: CashbackTransactionType.ADJUSTMENT,
      currency_code: prevAccount.currency_code,
      amount: data.amount,
    });
    const account = await locking.execute(prevAccount.id, () => {
      return service.updateCashbackAccounts({
        id: prevAccount.id,
        version: prevAccount.version + 1,
        balance: prevAccount.balance + data.amount,
      });
    });
    return new StepResponse(
      { account, transaction },
      { account: prevAccount, transaction },
    );
  },
  async (data, { container }) => {
    if (!data) return;
    const locking = container.resolve(Modules.LOCKING);
    const service = container.resolve(CASHBACK_MODULE);
    await service.deleteCashbackTransactions(data.transaction.id);
    await locking.execute(data.account.id, () =>
      service.updateCashbackAccounts({
        ...data.account,
        transactions: undefined,
      }),
    );
  },
);
