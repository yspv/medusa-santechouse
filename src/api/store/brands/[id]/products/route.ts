import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { remapKeyForBrandProducts } from "../../helpers";
import { isPresent, QueryContext } from "@medusajs/framework/utils";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const id = req.params.id;
  const query = req.scope.resolve("query");
  const fields = req.queryConfig.fields.map(remapKeyForBrandProducts);
  const context: object = {};

  if (isPresent(req.pricingContext)) {
    context["variants"] ??= {};
    context["variants"]["calculated_price"] ??= QueryContext(
      req.pricingContext!,
    );
  }

  const { data, metadata } = await query.graph({
    entity: "product_brand",
    filters: { brand_id: id },
    fields: fields,
    pagination: req.queryConfig.pagination,
    context: {
      product: {
        variants: {
          calculated_price: QueryContext({
            currency_code: "uzs",
          }),
        },
      },
    },
  });

  res.json({
    products: data.map((d) => d.product),
    count: metadata!.count,
    offset: metadata!.skip,
    limit: metadata!.take,
  });
};
