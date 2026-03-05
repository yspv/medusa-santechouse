import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { OrderLineItem } from "../../.medusa/types/query-entry-points";
import { creditCashbackWorkflow, adjustmentCashbackAccountBalanceWorkflow } from "@/workflows/cashback/workflows";

export const calculateOrderCashbacks = (data: {
  currency_code: string;
  items: any[];
}) => {
  return data.items.reduce((acc, item) => {
    const cashback = item.variant?.cashback;
    const amount = cashback?.amounts.find(
      (amount: any) => amount?.currency_code === data.currency_code,
    );
    if (!cashback?.is_active || !amount) return acc;
    // Ensure we handle BigNumber values if they come as objects/strings
    const val = typeof amount.amount === "object" ? amount.amount.numeric : Number(amount.amount);
    return acc + val * item.quantity;
  }, 0);
};

async function handleOrderPlaced({
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
      "customer.cashback_accounts.*",
      "items.*",
      "items.variant.*",
      "items.variant.cashback.*",
      "items.variant.cashback.amounts.*",
    ],
    filters: { id: data.id },
  });

  if (!order.customer) return;

  const cashbackAccount = order.customer.cashback_accounts?.find(
    (account: any) => account?.currency_code === order.currency_code,
  );
  if (!cashbackAccount) return;

  const totalCashbackAmount = calculateOrderCashbacks({
    currency_code: order.currency_code,
    items: order.items || [],
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

async function handleOrderCanceled({
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
      "customer.cashback_accounts.*",
      "items.*",
      "items.variant.*",
      "items.variant.cashback.*",
      "items.variant.cashback.amounts.*",
    ],
    filters: { id: data.id },
  });

  if (!order?.customer) return;

  const cashbackAccount = order.customer.cashback_accounts?.find(
    (account: any) => account?.currency_code === order.currency_code,
  );
  if (!cashbackAccount) return;

  const totalCashbackAmount = calculateOrderCashbacks({
    currency_code: order.currency_code,
    items: order.items || [],
  });

  if (totalCashbackAmount < 1) return;

  // We decrease the balance by the amount that was originally credited
  await adjustmentCashbackAccountBalanceWorkflow(container).run({
    input: {
      account_id: cashbackAccount.id,
      amount: -totalCashbackAmount,
      reference_id: order.id,
    },
  });
}

export default async function (args: SubscriberArgs<{ id: string }>) {
  if (args.event.name === "order.placed") {
    return await handleOrderPlaced(args);
  } else if (args.event.name === "order.canceled") {
    return await handleOrderCanceled(args);
  }
}

export const config: SubscriberConfig = {
  event: ["order.placed", "order.canceled"],
};
