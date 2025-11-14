import { CASHBACK_MODULE } from "@/modules/cashback";
import { CreateCashbackDTO, ICashbackModuleService } from "@/types";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const createCashbacksStepId = "create-cashbacks";
export const createCashbacksStep = createStep(
  createCashbacksStepId,
  async (data: CreateCashbackDTO[], { container }) => {
    const service = container.resolve<ICashbackModuleService>(CASHBACK_MODULE);
    const created = await service.createCashbacks(data);
    return new StepResponse(
      created,
      created.map((c) => c.id),
    );
  },
  async (ids, { container }) => {
    if (!ids?.length) return;
    const service = container.resolve<ICashbackModuleService>(CASHBACK_MODULE);
    await service.deleteCashbacks(ids);
  },
);
