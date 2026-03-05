import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { markInvoicesStaleWorkflow } from "../workflows/mark-invoices-stale"
import { calculateOrderCashbacks } from "./cashback"
import { adjustmentCashbackAccountBalanceWorkflow } from "@/workflows/cashback/workflows"

type EventPayload =
    | {
        id: string
    }
    | {
        order_id: string
    }

async function handleOrderEditConfirmed(orderId: string, container: any) {
    const query = container.resolve(ContainerRegistrationKeys.QUERY)

    // 1. Get current order state
    const { data: [order] } = await query.graph({
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
        filters: { id: orderId }
    })

    if (!order?.customer) return

    const cashbackAccount = order.customer.cashback_accounts?.find(
        (account: any) => account?.currency_code === order.currency_code
    )
    if (!cashbackAccount) return

    // 2. Calculate what the cashback SHOULD be now
    const currentTotalCashback = calculateOrderCashbacks({
        currency_code: order.currency_code,
        items: order.items || []
    })

    // 3. Calculate what was already credited/adjusted for this order
    // Note: We search for EARNED or ADJUSTMENT transactions for this order
    const { data: transactions } = await query.graph({
        entity: "cashback_transaction",
        fields: ["amount", "type"],
        filters: {
            reference_id: orderId,
            account_id: cashbackAccount.id
        }
    })

    const alreadyCredited = transactions.reduce((acc: number, t: any) => {
        const val = typeof t.amount === "object" ? t.amount.numeric : Number(t.amount)
        if (t.type === "earned" || (t.type === "adjustment" && val > 0)) {
            return acc + val
        }
        if (t.type === "adjustment" && val < 0) {
            return acc + val // val is negative
        }
        return acc
    }, 0)

    const diff = currentTotalCashback - alreadyCredited

    if (Math.abs(diff) < 1) return

    // 4. Adjust balance
    await adjustmentCashbackAccountBalanceWorkflow(container).run({
        input: {
            account_id: cashbackAccount.id,
            amount: diff,
            reference_id: orderId
        }
    })
}

export default async function orderUpdatedHandler({
    event,
    container,
}: SubscriberArgs<EventPayload>) {
    const data = event.data
    const orderId = "id" in data ? data.id : data.order_id

    await markInvoicesStaleWorkflow(container).run({
        input: {
            order_id: orderId,
        },
    })

    if (event.name === "order-edit.confirmed") {
        await handleOrderEditConfirmed(orderId, container)
    }
}

export const config: SubscriberConfig = {
    event: [
        "order.updated",
        "order-edit.confirmed",
        "order.exchange_created",
        "order.claim_created",
        "order.return_received",
    ],
}
