import { CashbackAccountDTO, CreateCashbackAccountDTO } from "@/types";
import {
  createStep,
  createWorkflow,
  StepResponse,
  transform,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  createCashbackAccountCustomerLinkStep,
  createCashbackAccountsStep,
} from "../steps";
import {
  ContainerRegistrationKeys,
  MedusaError,
} from "@medusajs/framework/utils";

export type CreateCashbackAccountsWorkflowInput = {
  accounts: CreateCashbackAccountDTO[];
};

const validateCreateCashbackAccounts = createStep(
  "validate-create-cashback-acccounts",
  async (
    data: CreateCashbackAccountsWorkflowInput["accounts"],
    { container },
  ) => {
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    const { data: accounts } = await query.graph({
      entity: "cashback_account",
      filters: { customer_id: data.map((c) => c.customer_id) },
      fields: ["*"],
    });
    const existedAccounts = accounts.reduce((acc, account) => {
      const customerId = account.customer_id;
      const currencyCode = account.currency_code;
      const currencyCodes = acc.get(customerId);
      if (currencyCodes) {
        currencyCodes.push(currencyCode);
      } else {
        acc.set(customerId, [currencyCode]);
      }
      return acc;
    }, new Map<string, string[]>());
    const isDublicated = data.some((d) =>
      existedAccounts.get(d.customer_id)?.includes(d.currency_code),
    );
    if (isDublicated) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Duplicated cashback account currencies",
      );
    }
    return new StepResponse(void 0);
  },
);

const linkCustomerWithCashback = (data: {
  created: CashbackAccountDTO[];
  input: CreateCashbackAccountsWorkflowInput;
}) => {
  return data.created.map((account, index) => {
    const account_id = account.id;
    const customer_id = data.input.accounts[index].customer_id;
    return { account_id, customer_id };
  });
};

export const createCashbackAccountsWorkflowId = "create-cashback-accounts";

export const createCashbackAccountsWorkflow = createWorkflow(
  createCashbackAccountsWorkflowId,
  (input: WorkflowData<CreateCashbackAccountsWorkflowInput>) => {
    validateCreateCashbackAccounts(input.accounts);
    const created = createCashbackAccountsStep(input.accounts);
    const accountAndCustomerLinks = transform(
      { created, input },
      linkCustomerWithCashback,
    );
    createCashbackAccountCustomerLinkStep({ links: accountAndCustomerLinks });
    return new WorkflowResponse(created);
  },
);
