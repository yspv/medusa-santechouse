import { CASHBACK_MODULE } from "@/modules/cashback";
import { CreateCashbackAmountDTO } from "@/types";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const createCashbackAmountsStepId = "create-cashback-amounts";

export const createCashbackAmountsStep = createStep(
  createCashbackAmountsStepId,
  async (data: CreateCashbackAmountDTO[], { container }) => {
    const service = container.resolve(CASHBACK_MODULE);
    const created = await service.createCashbackAmounts(data);
    return new StepResponse(
      created,
      created.map((c) => c.id),
    );
  },
  async (ids, { container }) => {
    if (!ids?.length) return;
    const service = container.resolve(CASHBACK_MODULE);
    await service.deleteCashbackAmounts(ids);
  },
);
