import { FilterableBrandProps, UpdateBrandDTO, UpsertBrandDTO } from "@/types";
import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { updateBrandsStep } from "../steps";

export type UpdateBrandsWorkflowInput =
  | {
      selector: FilterableBrandProps;
      update: UpdateBrandDTO;
    }
  | {
      brands: UpsertBrandDTO[];
    };

export const updateBrandsWorkflowId = "update-brands";

export const updateBrandsWorkflow = createWorkflow(
  updateBrandsWorkflowId,
  (input: UpdateBrandsWorkflowInput) => {
    const updatedBrands = updateBrandsStep(input);
    return new WorkflowResponse(updatedBrands);
  },
);
