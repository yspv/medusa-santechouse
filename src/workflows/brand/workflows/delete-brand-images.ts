import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { deleteBrandImagesStep } from "../steps/delete-brand-images";

export type DeleteBrandImagesInput = {
  ids: string[];
};

export const deleteBrandImagesWorkflow = createWorkflow(
  "delete-brand-images",
  (input: DeleteBrandImagesInput) => {
    const deletedImages = deleteBrandImagesStep(input);

    return new WorkflowResponse(deletedImages);
  },
);
