import { CASHBACK_MODULE } from "@/modules/cashback";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const deleteCashbackAmountsStepId = "delete-cashback-amounts";

export const deleteCashbackAmountsStep = createStep(
  deleteCashbackAmountsStepId,
  async (ids: string[], { container }) => {
    const service = container.resolve(CASHBACK_MODULE);
    await service.softDeleteCashbackAmounts(ids);
    return new StepResponse(void 0, ids);
  },
  async (ids, { container }) => {
    if (!ids?.length) return;
    const service = container.resolve(CASHBACK_MODULE);
    await service.restoreCashbackAmounts(ids);
  },
);
