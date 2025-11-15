import { CASHBACK_MODULE } from "@/modules/cashback";
import { CreateCashbackAccountDTO } from "@/types";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const createCashbackAccountsStepId = "create-cashback-accounts";
export const createCashbackAccountsStep = createStep(
  createCashbackAccountsStepId,
  async (data: CreateCashbackAccountDTO[], { container }) => {
    const service = container.resolve(CASHBACK_MODULE);
    const created = await service.createCashbackAccounts(data);
    return new StepResponse(
      created,
      created.map((c) => c.id),
    );
  },
  async (ids, { container }) => {
    if (!ids?.length) return;
    const service = container.resolve(CASHBACK_MODULE);
    await service.deleteCashbackAccounts(ids);
  },
);
