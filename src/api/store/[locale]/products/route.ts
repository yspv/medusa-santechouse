import { PAYLOAD_MODULE } from "@/modules/payload";
import {
  MedusaRequest,
  MedusaResponse,
  refetchEntities,
} from "@medusajs/framework";
import { remapKeysForPayloadProduct } from "./helpers";
import {
  StoreLocaleProductListResponse,
  StoreLocaleProductParams,
} from "@/types";

export const GET = async (
  req: MedusaRequest<StoreLocaleProductParams>,
  res: MedusaResponse<StoreLocaleProductListResponse>,
) => {
  const { locale } = req.params;

  const payloadModuleService = req.scope.resolve(PAYLOAD_MODULE);

  const payloadFields = remapKeysForPayloadProduct(req.queryConfig.fields);

  const {
    data,
    metadata: { count, take, skip },
  } = await refetchEntities({
    entity: "product",
    idOrFilter: req.filterableFields,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
    scope: req.scope,
  });

  const payloadProducts = await payloadModuleService.list(
    {
      product_id: data.map((p) => p.id),
      locale: locale,
    },
    { take, skip, select: payloadFields },
  );

  const payloadProductsMap = new Map(
    payloadProducts.map((doc) => [doc.medusa_id, doc]),
  );

  res.json({
    products: data.map((product) => {
      const payloadProduct = payloadProductsMap.get(product.id);
      return {
        ...product,
        payload_product: payloadProduct,
      };
    }),
    count: count || 0,
    limit: take || 0,
    offset: skip || 0,
  });
};
