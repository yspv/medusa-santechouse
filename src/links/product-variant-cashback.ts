import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import CashbackModule from "@/modules/cashback";

export default defineLink(
  ProductModule.linkable.productVariant,
  CashbackModule.linkable.cashback,
);
