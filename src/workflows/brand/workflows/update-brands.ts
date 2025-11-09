import { UpdateBrandDTO } from "@/types";
import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { updateBrandsStep } from "../steps";

export const updateBrandsWorkflowId = "update-brands";

export const updateBrandsWorkflow = createWorkflow(
  updateBrandsWorkflowId,
  (input: UpdateBrandDTO) => {
    const updatedBrands = updateBrandsStep(input);
    return new WorkflowResponse(updatedBrands);
  },
);
