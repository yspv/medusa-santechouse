import { CreateCustomerDTO, ExecArgs } from "@medusajs/types";
import customersData from "../../data/customers.json";
import { createCustomersWorkflow } from "@medusajs/medusa/core-flows";

export default async function ({ container }: ExecArgs) {
  const normalized: CreateCustomerDTO[] = [];
  for (const input of customersData) {
    normalized.push({
      first_name: input.first_name,
      last_name: input.last_name,
      phone: input.username.toString(),
      email: `${input.first_name.toLowerCase()}_${input.last_name.toLowerCase()}@santechouse.uz`,
      metadata: {
        old_id: input.id,
      },
    });
  }
  await createCustomersWorkflow(container).run({
    input: {
      customersData: normalized,
    },
  });
}
