import {
    AdminCashbackTransactionResponse,
} from "@/types";
import {
    MedusaRequest,
    MedusaResponse,
    refetchEntities,
} from "@medusajs/framework";
import { remapCashbackTransactionResponse } from "../helpers";

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse<AdminCashbackTransactionResponse>,
) => {
    const { id } = req.params;
    const { data } = await refetchEntities({
        entity: "cashback_transaction",
        idOrFilter: id,
        scope: req.scope,
        fields: req.queryConfig.fields,
        withDeleted: req.queryConfig.withDeleted,
    });

    const transaction = data[0];

    res.json({
        cashback_transaction: remapCashbackTransactionResponse(transaction as any),
    });
};
