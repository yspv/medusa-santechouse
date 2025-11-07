import { CreateBrandDTO } from "@/types";
import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createBrandStep } from "../steps";

export const createBrandsWorkflowId = "create-brands";

export const createBrandsWorkflow = createWorkflow(
  createBrandsWorkflowId,
  (input: CreateBrandDTO[]) => {
    const createdBrands = createBrandStep(input);
    return new WorkflowResponse(createdBrands);
  },
);
