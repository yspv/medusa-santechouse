import {
  MedusaRequest,
  MedusaResponse,
  refetchEntity,
} from "@medusajs/framework";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const id = req.params.id;
  const brand = await refetchEntity({
    entity: "brand",
    idOrFilter: id,
    scope: req.scope,
    fields: req.queryConfig.fields,
  });
  res.json({ brand });
};
