import { defineLink } from "@medusajs/framework/utils";
import CustomerModule from "@medusajs/medusa/customer";
import CashbackModule from "@/modules/cashback";

export default defineLink(CustomerModule.linkable.customer, {
  linkable: CashbackModule.linkable.cashbackAccount,
  field: "customer_id",
  isList: true,
});
