import { CASHBACK_MODULE } from "@/modules/cashback";
import { CashbackTransactionType } from "@/modules/cashback/models";
import { Modules } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export type CreditCashbackStepInput = {
  account_id: string;
  amount: number;
  reference_id?: string;
};

export const creditCashbackStepId = "credit-cashback";
export const creditCashbackStep = createStep(
  creditCashbackStepId,
  async (data: CreditCashbackStepInput, { container }) => {
    const locking = container.resolve(Modules.LOCKING);
    const service = container.resolve(CASHBACK_MODULE);
    const account = await service.retrieveCashbackAccount(data.account_id);
    const transaction = await service.createCashbackTransactions({
      account_id: data.account_id,
      amount: data.amount,
      reference_id: data.reference_id,
      currency_code: account.currency_code,
      type: CashbackTransactionType.EARNED,
    });
    const updated = await locking.execute(account.id, async () => {
      return await service.updateCashbackAccounts({
        id: account.id,
        version: account.version + 1,
        total_earned: account.total_earned + transaction.amount,
        balance: account.balance + transaction.amount,
      });
    });
    return new StepResponse(updated, { account, transaction });
  },
  async (data, { container }) => {
    if (!data) return;
    const { account } = data;
    const service = container.resolve(CASHBACK_MODULE);
    const locking = container.resolve(Modules.LOCKING);
    await service.deleteCashbackTransactions(data.transaction.id);
    await locking.execute(data.account.id, async () => {
      await service.updateCashbackAccounts({
        id: account.id,
        total_earned: account.total_earned,
        total_redeemed: account.total_redeemed,
        balance: account.balance,
      });
    });
  },
);
