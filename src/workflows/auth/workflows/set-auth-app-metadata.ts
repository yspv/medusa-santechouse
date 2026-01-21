import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  setAuthAppMetadataStep,
  SetAuthAppMetadataStepInput,
} from "@medusajs/medusa/core-flows";

export const setAuthAppMetadataWorklowId = "set-auth-app-metadata";
export const setAuthAppMetadataWorklow = createWorkflow(
  setAuthAppMetadataWorklowId,
  (input: SetAuthAppMetadataStepInput) => {
    const authIdentity = setAuthAppMetadataStep(input);
    return new WorkflowResponse(authIdentity);
  },
);
