import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { deleteBrandsStep } from "../steps";

export const deleteBrandsWorkflowId = "delete-brands";

export const deleteBrandsWorkflow = createWorkflow(
  deleteBrandsWorkflowId,
  (input: string[]) => {
    const deleted = deleteBrandsStep(input);
    return new WorkflowResponse(deleted);
  },
);
