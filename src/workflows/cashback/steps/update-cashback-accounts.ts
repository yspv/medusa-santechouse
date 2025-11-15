import { CASHBACK_MODULE } from "@/modules/cashback";
import { UpdateCashbackAccountDTO } from "@/types";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const updateCashbackAccountsStepId = "update-cashback-accounts";

export const updateCashbackAccountsStep = createStep(
  updateCashbackAccountsStepId,
  async (data: UpdateCashbackAccountDTO[], { container }) => {
    const service = container.resolve(CASHBACK_MODULE);
    const prevData = await service.listCashbackAccounts({
      id: data.map((c) => c.id),
    });
    const created = await service.updateCashbackAccounts(data);
    return new StepResponse(created, prevData);
  },
  async (prevData: UpdateCashbackAccountDTO[], { container }) => {
    if (!prevData?.length) return;
    const service = container.resolve(CASHBACK_MODULE);
    await service.updateCashbackAccounts(prevData);
  },
);
