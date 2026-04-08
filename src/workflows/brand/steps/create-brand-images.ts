import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { BRAND_MODULE } from "@/modules/brand";
import BrandModuleService from "@/modules/brand/service";
import { MedusaError } from "@medusajs/framework/utils";

export type CreateBrandImagesStepInput = {
  brand_images: {
    brand_id: string;
    type: "thumbnail" | "image";
    url: string;
    file_id: string;
  }[];
};

export const createBrandImagesStep = createStep(
  "create-brand-images-step",
  async (input: CreateBrandImagesStepInput, { container }) => {
    const brandService: BrandModuleService = container.resolve(BRAND_MODULE);

    // Group images by brand to handle thumbnails efficiently
    const imagesByBrand = input.brand_images.reduce(
      (acc, img) => {
        if (!acc[img.brand_id]) {
          acc[img.brand_id] = [];
        }
        acc[img.brand_id].push(img);
        return acc;
      },
      {} as Record<string, typeof input.brand_images>,
    );

    // Process each brand
    for (const [_, images] of Object.entries(imagesByBrand)) {
      const thumbnailImages = images.filter((img) => img.type === "thumbnail");

      if (thumbnailImages.length > 1) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "Only one thumbnail is allowed per brand",
        );
      }
    }

    const createdImages = await brandService.createBrandImages(
      Object.values(imagesByBrand).flat(),
    );

    return new StepResponse(createdImages, createdImages);
  },
  async (compensationData, { container }) => {
    if (!compensationData?.length) {
      return;
    }

    const brandService: BrandModuleService = container.resolve(BRAND_MODULE);

    await brandService.deleteBrandImages(compensationData.map((img: any) => img.id));
  },
);
