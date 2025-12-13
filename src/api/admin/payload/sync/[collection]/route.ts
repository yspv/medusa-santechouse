import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { collection } = req.params;
  const eventModuleService = req.scope.resolve(Modules.EVENT_BUS);

  eventModuleService.emit({
    name: `${collection}.sync-payload`,
    data: {},
  });

  return res.status(200).json({
    message: `Syncing ${collection} with Payload`,
  });
};
