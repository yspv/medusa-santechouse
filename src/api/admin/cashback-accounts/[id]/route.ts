import { AdminCashbackAccountResponse } from "@/types";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@medusajs/framework";
import { remapCashbackAccountResponse } from "../helpers";

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse<AdminCashbackAccountResponse>,
) => {
  const id = req.params.id;
  const cashbackAccount = await refetchEntity({
    entity: "cashback_accounts",
    idOrFilter: id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });
  res.json({
    cashback_account: remapCashbackAccountResponse(cashbackAccount as any),
  });
};
