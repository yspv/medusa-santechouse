import { PAYLOAD_MODULE } from "@/modules/payload";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export type RetrievePayloadItemsStepInput = {
  collection: string;
  where: Record<string, any>;
};

export const retrievePayloadItemsStepId = "retrieve-payload-items";
export const retrievePayloadItemsStep = createStep(
  retrievePayloadItemsStepId,
  async (data: RetrievePayloadItemsStepInput, { container }) => {
    const { collection, where } = data;
    const service = container.resolve(PAYLOAD_MODULE);
    const items = await service.find(collection, { where });
    return new StepResponse({
      items: items.docs,
    });
  },
);
