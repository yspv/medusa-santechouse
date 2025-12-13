import { PAYLOAD_MODULE } from "@/modules/payload";
import { PayloadUpsertData } from "@/modules/payload/types";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export type CreatePayloadItemsStepInput = {
  collection: string;
  items: PayloadUpsertData[];
};

export const createPayloadItemsStepId = "create-payload-items";
export const createPayloadItemsStep = createStep(
  createPayloadItemsStepId,
  async (data: CreatePayloadItemsStepInput, { container }) => {
    const { collection, items } = data;
    const service = container.resolve(PAYLOAD_MODULE);
    const created = await Promise.all(
      items.map(async (item) => await service.create(collection, item)),
    );

    return new StepResponse(
      {
        items: created.map((item) => item.doc),
      },
      {
        ids: created.map((item) => item.doc.id),
        collection,
      },
    );
  },
  async (data, { container }) => {
    const service = container.resolve(PAYLOAD_MODULE);
    if (!data) return;
    await service.delete(data.collection, {
      where: { id: { in: data.ids.join(",") } },
    });
  },
);
