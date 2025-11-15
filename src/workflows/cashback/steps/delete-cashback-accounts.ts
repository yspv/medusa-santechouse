import { CASHBACK_MODULE } from "@/modules/cashback";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const deleteCashbackAccountsStepId = "delete-cashback-account";

export const deleteCashbackAccountsStep = createStep(
  deleteCashbackAccountsStepId,
  async (ids: string[], { container }) => {
    const service = container.resolve(CASHBACK_MODULE);
    await service.softDeleteCashbackAccounts(ids);
    return new StepResponse(void 0, ids);
  },
  async (ids, { container }) => {
    if (!ids?.length) return;
    const service = container.resolve(CASHBACK_MODULE);
    await service.restoreCashbackAccounts(ids);
  },
);
