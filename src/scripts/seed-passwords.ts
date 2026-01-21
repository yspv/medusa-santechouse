import { CustomerDTO, ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import data from "../../data/customer_passwords.json";
import { setAuthAppMetadataWorklow } from "@/workflows/auth/workflows/set-auth-app-metadata";

export default async function ({ container }: ExecArgs) {
  const customerService = container.resolve(Modules.CUSTOMER);
  const authService = container.resolve(Modules.AUTH);
  const customers = await customerService.listCustomers(
    {},
    { select: ["id", "phone", "metadata"] },
  );
  const customerMap = customers.reduce<Map<string, CustomerDTO>>((acc, cus) => {
    const oldId = cus.metadata?.old_id;
    if (!oldId) return acc;
    acc.set(oldId as string, cus);
    return acc;
  }, new Map());

  for (const input of data) {
    const customer = customerMap.get(input.id);
    if (!customer || !customer.phone || customer.has_account) continue;
    const { authIdentity } = await authService.register("phonepass", {
      body: { phone: customer.phone, password: input.password, isHash: "true" },
    });
    if (authIdentity) {
      await setAuthAppMetadataWorklow(container).run({
        input: {
          authIdentityId: authIdentity?.id,
          actorType: "customer",
          value: customer.id,
        },
      });
    }
  }
}
