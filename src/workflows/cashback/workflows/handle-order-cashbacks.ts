import {
  createWorkflow,
  transform,
  when,
  WorkflowData,
} from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { creditCashbackStep } from "../steps";

export type HandleOrderCashbacksWorkflowInput = {
  order_id: string;
};

export const handleOrderCashbacksWorkflowId = "handle-order-cashbacks";

export const handleOrderCashbacksWorkflow = createWorkflow(
  handleOrderCashbacksWorkflowId,
  (input: WorkflowData<HandleOrderCashbacksWorkflowInput>) => {
    const { data: order } = useQueryGraphStep({
      entity: "order",
      fields: [
        "id",
        "currency_code",
        "customer.cashback_account.*",
        "items.*",
        "items.variant.*",
        "items.variant.cashback.*",
        "items.variant.cashback.amounts.*",
      ],
      filters: {
        id: input.order_id,
      },
      options: {
        throwIfKeyNotFound: true,
        isList: false,
      },
    });

    const account = transform(
      order,
      (order) => order.customer?.cashback_account,
    );

    const items = transform({ order }, (data) => data.order.items);

    const total = transform(
      { currency_code: order.currency_code, items },
      (data) => {
        if (!data.items) return 0;
        return data.items.reduce((acc, item) => {
          const cashback = item?.variant?.cashback;
          if (!cashback || !cashback.is_active) return acc;
          const amount = cashback.amounts.find(
            (c) => c?.currency_code === data.currency_code,
          );
          if (!amount) return acc;
          return acc + amount.amount * item.quantity;
        }, 0);
      },
    );

    when({ total, account }, (data) => {
      return data.total > 0 && !!data.account?.is_active;
    }).then(() => {
      creditCashbackStep({
        account_id: account.id,
        reference_id: order.id,
        amount: total,
      });
    });
  },
);
