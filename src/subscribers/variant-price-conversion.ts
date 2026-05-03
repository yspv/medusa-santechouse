import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { convertVariantPricesWorkflow } from "@/workflows/price-conversion/workflows";

export default async function variantPriceConversionHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  try {
    await convertVariantPricesWorkflow(container).run({
      input: { variant_id: data.id },
    });
    logger.info(`Price conversion applied to variant ${data.id}`);
  } catch (error) {
    logger.error(
      `Failed to apply price conversion to variant ${data.id}: ${error.message}`,
    );
  }
}

export const config: SubscriberConfig = {
  event: "product-variant.created",
};
