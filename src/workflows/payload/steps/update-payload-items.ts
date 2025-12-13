import { PAYLOAD_MODULE } from "@/modules/payload";
import { PayloadItemResult, PayloadUpsertData } from "@/modules/payload/types";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export type UpdatePayloadItemsStepInput = {
  collection: string;
  items: PayloadUpsertData[];
};

export const updatePayloadItemsStepId = "update-payload-items";
export const updatePayloadItemsStep = createStep(
  updatePayloadItemsStepId,
  async (data: UpdatePayloadItemsStepInput, { container }) => {
    const service = container.resolve(PAYLOAD_MODULE);
    const ids = data.items.map((item) => item.id);
    const prevData = await service.find(data.collection, {
      where: { id: { in: ids.join(",") } },
    });
    const updated: PayloadItemResult[] = [];
    for (const item of data.items) {
      const { id, ...rest } = item;
      updated.push(
        await service.update(data.collection, rest, {
          where: { id: { equals: id } },
        }),
      );
    }

    return new StepResponse(
      {
        items: updated.map((item) => item.doc),
      },
      {
        prevData,
        collection: data.collection,
      },
    );
  },
  async (data, { container }) => {
    if (!data) return;
    const { prevData, collection } = data;
    const service = container.resolve(PAYLOAD_MODULE);
    await Promise.all(
      prevData.docs.map(async ({ id, ...item }) => {
        await service.update(collection, item, {
          where: { id: { eqauls: id } },
        });
      }),
    );
  },
);
