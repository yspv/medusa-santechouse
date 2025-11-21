import { CASHBACK_MODULE } from "@/modules/cashback";
import { CashbackTransactionType } from "@/modules/cashback/models";
import { MedusaError, Modules } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export type RedeemCashbackStepInput = {
  account_id: string;
  amount: number;
  reference_id?: string;
};
export const redeemCashbackStepId = "redeem-cashback";
export const redeemCashbackStep = createStep(
  redeemCashbackStepId,
  async (data: RedeemCashbackStepInput, { container }) => {
    const locking = container.resolve(Modules.LOCKING);
    const service = container.resolve(CASHBACK_MODULE);
    const account = await service.retrieveCashbackAccount(data.account_id);
    if (data.amount > account.balance) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Redeemed amount can not be more than balance",
      );
    }
    const transaction = await service.createCashbackTransactions({
      account_id: data.account_id,
      type: CashbackTransactionType.REDEEM,
      currency_code: account.currency_code,
      amount: data.amount,
    });
    const updated = await locking.execute(account.id, async () => {
      return service.updateCashbackAccounts({
        id: account.id,
        version: account.version + 1,
        total_redeemed: account.total_redeemed + data.amount,
        balance: account.balance - data.amount,
      });
    });
    return new StepResponse(
      { account: updated, transaction },
      { account, transaction },
    );
  },
  async (data, { container }) => {
    if (!data) return;
    const locking = container.resolve(Modules.LOCKING);
    const service = container.resolve(CASHBACK_MODULE);
    await service.deleteCashbackTransactions(data.transaction.id);
    await locking.execute(data.account.id, async () => {
      await service.updateCashbackAccounts({
        ...data.account,
        transactions: undefined,
      });
    });
  },
);
