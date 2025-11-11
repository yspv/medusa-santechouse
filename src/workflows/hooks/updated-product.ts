import { BRAND_MODULE } from "@/modules/brand";
import { StepResponse } from "@medusajs/framework/workflows-sdk";
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows";
import { LinkDefinition } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

updateProductsWorkflow.hooks.productsUpdated(
  async ({ products, additional_data }, { container }) => {
    const brandId = additional_data?.brand_id;
    if (!brandId) {
      return new StepResponse([], []);
    }
    const service = container.resolve(BRAND_MODULE);
    const link = container.resolve("link");
    const links: LinkDefinition[] = [];
    const logger = container.resolve("logger");
    const query = container.resolve("query");
    await service.retrieveBrand(brandId as string);
    const { data: productBrands } = await query.graph({
      entity: "product_brand",
      fields: ["product_id", "brand_id"],
      filters: { product_id: products.map((p) => p.id) },
    });
    if (productBrands.length) {
      await link.dismiss(
        productBrands.map((pb) => ({
          [Modules.PRODUCT]: {
            product_id: pb.product_id,
          },
          [BRAND_MODULE]: {
            brand_id: pb.brand_id,
          },
        })),
      );
    }
    for (const product of products) {
      links.push({
        [Modules.PRODUCT]: {
          product_id: product.id,
        },
        [BRAND_MODULE]: {
          brand_id: brandId,
        },
      });
    }
    await link.create(links);
    logger.info("Linked brand to products");
    return new StepResponse(links, links);
  },
  async (links, { container }) => {
    if (!links?.length) {
      return;
    }
    const link = container.resolve("link");
    await link.dismiss(links);
  },
);
