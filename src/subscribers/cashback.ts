import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { OrderLineItem } from "../../.medusa/types/query-entry-points";
import { creditCashbackWorkflow } from "@/workflows/cashback/workflows";

const calculateOrderCashbacks = (data: {
  currency_code: string;
  items: OrderLineItem[];
}) => {
  return data.items.reduce((acc, item) => {
    const cashback = item.variant?.cashback;
    const amount = cashback?.amounts.find(
      (amount) => amount?.currency_code === data.currency_code,
    );
    if (!cashback?.is_active || !amount) return acc;
    return acc + amount.amount * item.quantity;
  }, 0);
};

export default async function ({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const {
    data: [order],
  } = await query.graph({
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
    filters: { id: data.id },
  });
  const cashbackAccount = order.customer?.cashback_accounts?.find(
    (account) => account?.currency_code === order.currency_code,
  );
  if (!cashbackAccount) return;
  const totalCashbackAmount = calculateOrderCashbacks({
    currency_code: order.currency_code,
    items: order.items as OrderLineItem[],
  });
  if (totalCashbackAmount < 1) return;
  await creditCashbackWorkflow(container).run({
    input: {
      account_id: cashbackAccount.id,
      amount: totalCashbackAmount,
      reference_id: order.id,
    },
  });
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
