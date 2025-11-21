import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Order } from "../../../../.medusa/types/query-entry-points";
import { MedusaError } from "@medusajs/framework/utils";

export type GetOrderCashbackAccountStepInput = { order: Order };

export const getOrderCashbackAccountStep = createStep(
  "get-order-cashback-account",
  ({ order }: GetOrderCashbackAccountStepInput) => {
    const account = order.customer?.cashback_accounts?.find(
      (account) => account?.currency_code === order.currency_code,
    );
    if (!account) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Customer does not have cashback account with ${order.currency_code} currency`,
      );
    }
    return new StepResponse(account);
  },
);
