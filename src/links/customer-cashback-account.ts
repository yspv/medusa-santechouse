import { defineLink } from "@medusajs/framework/utils";
import CustomerModule from "@medusajs/medusa/customer";
import CashbackModule from "@/modules/cashback";

export default defineLink(
  CustomerModule.linkable.customer,
  CashbackModule.linkable.cashbackAccount,
);
