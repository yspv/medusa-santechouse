import {
  AdminCashbackAmountParams,
  AdminCashbackAmountResponse,
} from "@/types";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@medusajs/framework";
import { remapCashbackAmountResponse } from "../../../helpers";

export const GET = async (
  req: MedusaRequest<AdminCashbackAmountParams>,
  res: MedusaResponse<AdminCashbackAmountResponse>,
) => {
  const cashbackId = req.params.id;
  const cashbackAmountId = req.params.amount_id;
  const filter = { id: cashbackAmountId, cashback_id: cashbackId };
  const cashbackAmount = await refetchEntity({
    entity: "cashback_amount",
    idOrFilter: filter,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });
  res.json({
    cashback_amount: remapCashbackAmountResponse(cashbackAmount as any),
  });
};
