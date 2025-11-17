import { listCashbackAmountConfig } from "@/api/admin/cashbacks/query-config";
import { CASHBACK_MODULE } from "@/modules/cashback";
import {
  CashbackAmountDTO,
  FilterableCashbackAmountProps,
  UpdateCashbackAmountDTO,
  UpsertCashbackAmountDTO,
} from "@/types";
import {
  getSelectsAndRelationsFromObjectArray,
  MedusaError,
} from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export type UpdateCashbackAmountsStepInput =
  | {
      selector: FilterableCashbackAmountProps;
      data: UpdateCashbackAmountDTO;
    }
  | { cashback_amounts: UpsertCashbackAmountDTO[] };

export const updateCashbackAmountsStepId = "update-cashback-amounts";

export const updateCashbackAmountsStep = createStep(
  updateCashbackAmountsStepId,
  async (data: UpdateCashbackAmountsStepInput, { container }) => {
    const service = container.resolve(CASHBACK_MODULE);
    if ("cashback_amounts" in data) {
      if (data.cashback_amounts.some((c) => !c.id)) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "Cashback amount ID is required when doing a batch update of cashback amounts",
        );
      }
      const prevData = await service.listCashbackAmounts({
        id: data.cashback_amounts.map((c) => c.id),
      });
      const updated = await service.updateCashbackAmounts(
        data.cashback_amounts,
      );
      return new StepResponse(updated, prevData);
    }
    const { selects, relations } = getSelectsAndRelationsFromObjectArray([
      data.data,
    ]);
    const prevData = await service.listCashbackAmounts(selects, {
      select: selects,
      relations,
    });
    const updated = await service.updateCashbackAmounts({
      data: data.data,
      selector: data.selector,
    });
    return new StepResponse(updated, prevData);
  },
  async (prevData: UpdateCashbackAmountDTO[], { container }) => {
    if (!prevData?.length) return;
    const service = container.resolve(CASHBACK_MODULE);
    await service.updateCashbackAmounts(prevData);
  },
);
