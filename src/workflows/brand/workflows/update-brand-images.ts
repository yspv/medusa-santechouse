import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { updateBrandImagesStep } from "../steps/update-brand-images";

export type UpdateBrandImagesInput = {
  updates: {
    id: string;
    type?: "thumbnail" | "image";
  }[];
};

export const updateBrandImagesWorkflow = createWorkflow(
  "update-brand-images",
  (input: UpdateBrandImagesInput) => {
    const updatedImages = updateBrandImagesStep(input);

    return new WorkflowResponse(updatedImages);
  },
);
