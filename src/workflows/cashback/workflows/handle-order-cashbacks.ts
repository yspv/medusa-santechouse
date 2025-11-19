import {
  createWorkflow,
  transform,
  when,
  WorkflowData,
  WorkflowResponse,
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
    const { data: orders } = useQueryGraphStep({
      entity: "order",
      fields: ["id", "currency_code", "customer.cashback_account.*", "items.*"],
      filters: {
        id: input.order_id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    });
    const order = transform(orders, (orders) => orders[0]);
    const account = transform(
      order,
      (order) => order.customer?.cashback_account,
    );
    const variantIds = transform(order, ({ items }) => {
      return items
        ?.filter((item) => !!item?.variant_id)
        .map((item) => item!.variant_id);
    });
    const { data: cashbacks } = useQueryGraphStep({
      entity: "product_variant_cashback",
      fields: ["product_variant_id", "cashback.*", "cashback.amounts.*"],
      filters: { product_variant_id: variantIds as string[] },
    }).config({ name: "cashbacks-query-graphq" });
    const activeCashbacks = transform({ cashbacks }, (data) => {
      return data.cashbacks.filter((c) => !!c.cashback?.is_active);
    });
    const total = transform({ order, cashbacks: activeCashbacks }, (data) => {
      const items = data.order.items || [];
      return data.cashbacks.reduce((acc, { cashback, product_variant_id }) => {
        const amount = cashback!.amounts.find(
          (a) => a?.currency_code === data.order.currency_code,
        );
        if (!amount) return acc;
        const variantId = product_variant_id;
        const item = items.find((i) => i?.variant_id === variantId);
        if (!item) return acc;
        return acc + amount.amount * item.quantity;
      }, 0);
    });
    when({ total, account }, (data) => {
      return data.total > 0 && !!data.account?.is_active;
    }).then(() => {
      return creditCashbackStep({
        account_id: account.id,
        reference_id: order.id,
        amount: total,
      });
    });
  },
);
