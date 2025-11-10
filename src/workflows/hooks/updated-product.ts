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
    await service.retrieveBrand(brandId as string);
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
