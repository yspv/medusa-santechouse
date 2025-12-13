import { PAYLOAD_MODULE } from "@/modules/payload";
import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";

export default defineLink(
  {
    linkable: ProductModule.linkable.product.id,
    field: "id",
  },
  {
    linkable: {
      serviceName: PAYLOAD_MODULE,
      alias: "payload_product",
      primaryKey: "product_id",
    },
  },
  {
    readOnly: true,
  },
);
