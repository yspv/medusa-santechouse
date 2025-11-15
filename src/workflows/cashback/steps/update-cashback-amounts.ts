import { CASHBACK_MODULE } from "@/modules/cashback";
import { UpdateCashbackAmountDTO } from "@/types";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const updateCashbackAmountsStepId = "update-cashback-amounts";

export const updateCashbackAmountsStep = createStep(
  updateCashbackAmountsStepId,
  async (data: UpdateCashbackAmountDTO[], { container }) => {
    const service = container.resolve(CASHBACK_MODULE);
    const prevData = await service.listCashbackAmounts({
      id: data.map((c) => c.id),
    });
    const updated = await service.updateCashbackAmounts(data);
    return new StepResponse(updated, prevData);
  },
  async (prevData: UpdateCashbackAmountDTO[], { container }) => {
    if (!prevData?.length) return;
    const service = container.resolve(CASHBACK_MODULE);
    await service.updateCashbackAmounts(prevData);
  },
);
