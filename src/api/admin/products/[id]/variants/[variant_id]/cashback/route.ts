import { AdminProductVariantResponse } from "@medusajs/framework/types";
import { AdminCreateCashback } from "@/api/admin/products/validators";
import { createCashbacksWorkflow } from "@/workflows/cashback/workflows";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@medusajs/framework";
import { remapVariantResponse } from "@medusajs/medusa/api/admin/products/helpers";

export const POST = async (
  req: MedusaRequest<AdminCreateCashback>,
  res: MedusaResponse<AdminProductVariantResponse>,
) => {
  const variantId = req.params.variant_id;

  const input = [
    {
      variant_id: variantId,
      ...req.validatedBody,
    },
  ];

  const { result } = await createCashbacksWorkflow(req.scope).run({
    input: { cashbacks: input },
  });

  const variant = await refetchEntity({
    entity: "variant",
    idOrFilter: { id: result.map((c) => c.id) },
    scope: req.scope,
    fields: req.queryConfig.fields,
  });

  res.json({ variant: remapVariantResponse(variant as any) });
};
