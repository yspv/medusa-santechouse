import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { BRAND_MODULE } from "@/modules/brand";
import BrandModuleService from "@/modules/brand/service";

export type UpdateBrandImagesStepInput = {
  updates: {
    id: string;
    type?: "thumbnail" | "image";
  }[];
};

export const updateBrandImagesStep = createStep(
  "update-brand-images-step",
  async (input: UpdateBrandImagesStepInput, { container }) => {
    const brandService: BrandModuleService = container.resolve(BRAND_MODULE);

    const prevData = await brandService.listBrandImages({
      id: input.updates.map((u) => u.id),
    });

    const updatedData = await brandService.updateBrandImages(input.updates);

    return new StepResponse(updatedData, prevData);
  },
  async (compensationData, { container }) => {
    if (!compensationData?.length) {
      return;
    }

    const brandService: BrandModuleService = container.resolve(BRAND_MODULE);

    await brandService.updateBrandImages(
      compensationData.map((img: any) => ({
        id: img.id,
        type: img.type,
      })),
    );
  },
);
