import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createBrandImagesStep } from "../steps/create-brand-images";

export type CreateBrandImagesInput = {
  brand_images: {
    brand_id: string;
    type: "thumbnail" | "image";
    url: string;
    file_id: string;
  }[];
};

export const createBrandImagesWorkflow = createWorkflow(
  "create-brand-images",
  (input: CreateBrandImagesInput) => {
    const brandImages = createBrandImagesStep({
      brand_images: input.brand_images,
    });

    return new WorkflowResponse(brandImages);
  },
);
