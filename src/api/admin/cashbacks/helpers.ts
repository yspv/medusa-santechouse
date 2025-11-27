import {
  AdminCashback,
  AdminCashbackAmount,
  CashbackAmountDTO,
  CashbackDTO,
} from "@/types";
import {
  BatchMethodResponse,
  BatchResponse,
  MedusaContainer,
} from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  promiseAll,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils";
import { remapVariantResponse } from "@medusajs/medusa/api/admin/products/helpers";

export const remapCashbackResponse = (cashback: CashbackDTO): AdminCashback => {
  return {
    ...cashback,
    product_variant: cashback.product_variant
      ? remapVariantResponse(cashback.product_variant)
      : undefined,
    amounts: cashback.amounts.map((c) => remapCashbackAmountResponse(c)),
  };
};

export const remapCashbackAmountResponse = (
  data: CashbackAmountDTO,
): AdminCashbackAmount => {
  return {
    ...data,
    cashback: data.cashback ? remapCashbackResponse(data.cashback) : undefined,
  };
};

export const refetchBatchCashbackAmounts = async (
  batchResult: BatchMethodResponse<CashbackAmountDTO>,
  scope: MedusaContainer,
  fields: string[],
): Promise<BatchResponse<CashbackAmountDTO>> => {
  const query = scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY);
  let created = Promise.resolve<CashbackAmountDTO[]>([]);
  let updated = Promise.resolve<CashbackAmountDTO[]>([]);
  if (batchResult.created.length) {
    const createdQuery = remoteQueryObjectFromString({
      entryPoint: "cashback_amount",
      variables: {
        filters: { id: batchResult.created.map((c) => c.id) },
      },
      fields,
    });
    created = query(createdQuery);
  }
  if (batchResult.updated.length) {
    const updatedQuery = remoteQueryObjectFromString({
      entryPoint: "cashback_amount",
      variables: {
        filters: { id: batchResult.updated.map((c) => c.id) },
      },
      fields,
    });

    updated = query(updatedQuery);
  }

  const [createdRes, updatedRes] = await promiseAll([created, updated]);
  return {
    created: createdRes,
    updated: updatedRes,
    deleted: {
      ids: batchResult.deleted,
      object: "cashback_amount",
      deleted: true,
    },
  };
};
