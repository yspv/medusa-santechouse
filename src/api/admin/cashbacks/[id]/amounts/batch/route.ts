import {
  AdminBatchCashbackAmountRequest,
  AdminBatchCashbackAmountResponse,
} from "@/types";
import { batchCashbackAmountsWorkflow } from "@/workflows/cashback/workflows";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { SelectParams } from "@medusajs/framework/types";
import {
  refetchBatchCashbackAmounts,
  remapCashbackAmountResponse,
} from "../../../helpers";

export const POST = async (
  req: MedusaRequest<AdminBatchCashbackAmountRequest, SelectParams>,
  res: MedusaResponse<AdminBatchCashbackAmountResponse>,
) => {
  const cashbackId = req.params.id;
  const normalizedInput = {
    create: req.validatedBody.create?.map((c) => ({
      ...c,
      cashback_id: cashbackId,
    })),
    update: req.validatedBody.update?.map((c) => ({
      ...c,
      cashback_id: cashbackId,
    })),
    delete: req.validatedBody.delete,
  };

  const { result } = await batchCashbackAmountsWorkflow(req.scope).run({
    input: normalizedInput,
  });

  const batchResult = await refetchBatchCashbackAmounts(
    result,
    req.scope,
    req.queryConfig.fields,
  );

  res.status(200).json({
    created: batchResult.created.map((c) => remapCashbackAmountResponse(c)),
    updated: batchResult.updated.map((c) => remapCashbackAmountResponse(c)),
    deleted: batchResult.deleted,
  });
};
