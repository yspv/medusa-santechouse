import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { BRAND_MODULE } from "@/modules/brand";
import BrandModuleService from "@/modules/brand/service";

export type DeleteBrandImagesStepInput = {
  ids: string[];
};

export const deleteBrandImagesStep = createStep(
  "delete-brand-images-step",
  async (input: DeleteBrandImagesStepInput, { container }) => {
    const brandService: BrandModuleService = container.resolve(BRAND_MODULE);

    const brandImages = await brandService.listBrandImages({
      id: input.ids,
    });

    await brandService.deleteBrandImages(input.ids);

    return new StepResponse(
      { success: true, deleted: input.ids },
      brandImages,
    );
  },
  async (brandImages, { container }) => {
    if (!brandImages || brandImages.length === 0) {
      return;
    }

    const brandService: BrandModuleService = container.resolve(BRAND_MODULE);

    await brandService.createBrandImages(
      brandImages.map((brandImage: any) => ({
        id: brandImage.id,
        brand_id: brandImage.brand_id,
        type: brandImage.type,
        url: brandImage.url,
        file_id: brandImage.file_id,
      })),
    );
  },
);
