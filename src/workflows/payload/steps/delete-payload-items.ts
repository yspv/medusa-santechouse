import { PAYLOAD_MODULE } from "@/modules/payload";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export type DeletePayloadItemsStepInput = {
  collection: string;
  where: Record<string, any>;
};

export const deletePayloadItemsStepId = "delete-payload-items";
export const deletePayloadItemsStep = createStep(
  deletePayloadItemsStepId,
  async ({ collection, where }: DeletePayloadItemsStepInput, { container }) => {
    const service = container.resolve(PAYLOAD_MODULE);
    const prevData = await service.find(collection, { where });
    await service.delete(collection, { where });
    return new StepResponse(void 0, { prevData, collection });
  },
  async (data, { container }) => {
    if (!data) return;
    const { collection, prevData } = data;
    const service = container.resolve(PAYLOAD_MODULE);
    for (const item of prevData.docs) {
      await service.create(collection, item);
    }
  },
);
