import { AdminCashbackResponse } from "@/types";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@medusajs/framework";
import { remapCashbackResponse } from "../helpers";

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse<AdminCashbackResponse>,
) => {
  const id = req.params.id;
  const cashback = await refetchEntity({
    entity: "cashback",
    idOrFilter: id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });

  res.json({ cashback: remapCashbackResponse(cashback as any) });
};
