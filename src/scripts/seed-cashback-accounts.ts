import accountsData from "../../data/cashback_accounts.json";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { CreateCashbackAccountDTO } from "@/types";
import { ExecArgs } from "@medusajs/framework/types";
import { createCashbackAccountsWorkflow } from "@/workflows/cashback/workflows";

export default async function ({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  const { data: customers } = await query.graph({
    entity: "customer",
    fields: ["id", "phone", "cashback_accounts.*"],
  });

  const customerMap = customers.reduce((acc, customer) => {
    if (!customer.phone) return acc;
    acc.set(customer.phone, customer.id);
    return acc;
  }, new Map<string, string>());

  const normalized: Array<CreateCashbackAccountDTO> = [];

  for (const input of accountsData) {
    const customerId = customerMap.get(`${input.username}`);
    if (!customerId) continue;

    normalized.push({
      customer_id: customerId,
      currency_code: "uzs",
      balance: input.current_amount,
      is_active: true,
    });
  }

  await createCashbackAccountsWorkflow(container).run({
    input: {
      accounts: normalized,
    },
  });
}
