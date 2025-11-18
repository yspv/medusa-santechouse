import { CASHBACK_MODULE } from "@/modules/cashback";
import {
  FilterableCashbackAccountProps,
  UpdateCashbackAccountDTO,
  UpsertCashbackAccountDTO,
} from "@/types";
import {
  getSelectsAndRelationsFromObjectArray,
  MedusaError,
} from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export type UpdateCashbackAccountsStepInput =
  | {
      selector: FilterableCashbackAccountProps;
      data: UpdateCashbackAccountDTO;
    }
  | {
      cashback_accounts: UpsertCashbackAccountDTO[];
    };

export const updateCashbackAccountsStepId = "update-cashback-accounts";

export const updateCashbackAccountsStep = createStep(
  updateCashbackAccountsStepId,
  async (data: UpdateCashbackAccountsStepInput, { container }) => {
    const service = container.resolve(CASHBACK_MODULE);
    if ("cashback_accounts" in data) {
      if (data.cashback_accounts.some((c) => !c.id)) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "Cashback account ID is required when doing a batch update of cashback accounts",
        );
      }
      const prevData = await service.listCashbackAccounts({
        id: data.cashback_accounts.map((c) => c.id),
      });
      const updated = await service.updateCashbackAccounts(
        data.cashback_accounts,
      );
      return new StepResponse(updated, prevData);
    }
    const { selects, relations } = getSelectsAndRelationsFromObjectArray([
      data.data,
    ]);
    const prevData = await service.listCashbackAccounts(data.selector, {
      select: selects,
      relations,
    });
    const created = await service.updateCashbackAccounts({
      selector: data.selector,
      data: data.data,
    });
    return new StepResponse(created, prevData);
  },
  async (prevData: UpdateCashbackAccountDTO[], { container }) => {
    if (!prevData?.length) return;
    const service = container.resolve(CASHBACK_MODULE);
    await service.updateCashbackAccounts(prevData);
  },
);
