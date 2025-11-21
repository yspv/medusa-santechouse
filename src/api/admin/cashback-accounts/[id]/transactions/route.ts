import {
  AdminCashbackTransactionListResponse,
  AdminCashbackTransactionParams,
} from "@/types";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntities,
} from "@medusajs/framework";
import { remapCashbackTransactionResponse } from "../../helpers";

export const GET = async (
  req: MedusaRequest<AdminCashbackTransactionParams>,
  res: MedusaResponse<AdminCashbackTransactionListResponse>,
) => {
  const accountId = req.params.id;
  const { data, metadata } = await refetchEntities({
    entity: "cashback_transaction",
    idOrFilter: { account_id: accountId },
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
    withDeleted: req.queryConfig.withDeleted,
  });
  res.json({
    cashback_transactions: data.map((transaction) =>
      remapCashbackTransactionResponse(transaction as any),
    ),
    count: metadata.count,
    limit: metadata.take,
    offset: metadata.skip,
  });
};
