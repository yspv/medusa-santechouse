import { StoreLocaleProductParams, StoreLocaleProductResponse } from "@/types";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  QueryContext,
} from "@medusajs/framework/utils";

export const GET = async (
  req: MedusaRequest<StoreLocaleProductParams>,
  res: MedusaResponse<StoreLocaleProductResponse>,
) => {
  const { locale, id } = req.params;
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const {
    data: [product],
  } = await query.graph({
    entity: "product",
    filters: { id },
    fields: req.queryConfig.fields,
    context: {
      payload_product: QueryContext({ locale }),
    },
  });

  res.json({ product });
};
