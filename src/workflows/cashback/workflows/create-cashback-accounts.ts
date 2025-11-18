import { CreateCashbackAccountDTO } from "@/types";
import {
  createWorkflow,
  transform,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  createCashbackAccountCustomerLinkStep,
  createCashbackAccountsStep,
} from "../steps";

export type CreateCashbackAccountsWorkflowInput = {
  accounts: (CreateCashbackAccountDTO & { customer_id: string })[];
};

export const createCashbackAccountsWorkflowId = "create-cashback-accounts";

export const createCashbackAccountsWorkflow = createWorkflow(
  createCashbackAccountsWorkflowId,
  (input: WorkflowData<CreateCashbackAccountsWorkflowInput>) => {
    const created = createCashbackAccountsStep(input.accounts);
    const accountAndCustomerLinks = transform({ created, input }, (data) => {
      return data.created.map((account, index) => {
        const account_id = account.id;
        const customer_id = data.input.accounts[index].customer_id;
        return { account_id, customer_id };
      });
    });
    createCashbackAccountCustomerLinkStep({ links: accountAndCustomerLinks });
    return new WorkflowResponse(created);
  },
);
