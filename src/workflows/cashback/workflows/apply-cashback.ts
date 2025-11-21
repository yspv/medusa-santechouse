import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  createOrderCreditLinesWorkflow,
  useQueryGraphStep,
} from "@medusajs/medusa/core-flows";
import {
  redeemCashbackStep,
  getOrderCashbackAccountStep,
  validateCashbackAccountBalanceStep,
} from "../steps";
import { applyCashbackOrderFields } from "../utils/fields";

export type ApplyCashbackWorkflowInput = {
  order_id: string;
  amount: number;
};

export const applyCashbackWorkflowId = "apply-cashback";
export const applyCashbackWorkflow = createWorkflow(
  applyCashbackWorkflowId,
  (input: WorkflowData<ApplyCashbackWorkflowInput>) => {
    const { data: order } = useQueryGraphStep({
      entity: "order",
      fields: applyCashbackOrderFields,
      filters: {
        id: input.order_id,
      },
      options: { isList: false },
    });
    const account = getOrderCashbackAccountStep({ order });
    validateCashbackAccountBalanceStep({ account, amount: input.amount });
    const { transaction } = redeemCashbackStep({
      account_id: account.id,
      amount: input.amount,
    });
    const creditLines = createOrderCreditLinesWorkflow.runAsStep({
      input: {
        id: order.id,
        credit_lines: [
          {
            reference: "cashback",
            reference_id: transaction.id,
            amount: input.amount,
          },
        ],
      },
    });
    return new WorkflowResponse({ credit_line: creditLines[0], transaction });
  },
);
