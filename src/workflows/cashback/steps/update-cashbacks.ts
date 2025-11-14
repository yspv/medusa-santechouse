import { CASHBACK_MODULE } from "@/modules/cashback";
import { UpdateCashbackDTO } from "@/types";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const updateCashbacksStepId = "update-cashbacks";
export const updateCashbacksStep = createStep(
  updateCashbacksStepId,
  async (data: UpdateCashbackDTO[], { container }) => {
    const service = container.resolve(CASHBACK_MODULE);
    const prevData = await service.listCashbacks({ id: data.map((c) => c.id) });
    const brands = await service.updateCashbacks(data);
    return new StepResponse(brands, prevData);
  },
  async (prevData: UpdateCashbackDTO[], { container }) => {
    if (!prevData?.length) return;
    const service = container.resolve(CASHBACK_MODULE);
    await service.updateCashbacks(prevData);
  },
);
