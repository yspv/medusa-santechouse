import { CASHBACK_MODULE } from "@/modules/cashback";
import { CashbackTransactionType } from "@/modules/cashback/models";
import { CreateCashbackTransactionDTO } from "@/types";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

const stringToTransactionType = (value: string) => {
  const foundKey = Object.keys(CashbackTransactionType).find(
    (key) => CashbackTransactionType[key] === value,
  );
  return foundKey ? CashbackTransactionType[foundKey] : undefined;
};

export const createCashbackTransactionsStepId = "create-cashback-transactions";
export const createCashbackTransactions = createStep(
  createCashbackTransactionsStepId,
  async (data: CreateCashbackTransactionDTO[], { container }) => {
    const service = container.resolve(CASHBACK_MODULE);
    const created = await service.createCashbackTransactions(
      data.map((c) => ({
        ...c,
        type: stringToTransactionType(c.type),
      })),
    );
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
