import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import slugify from "slugify";
import { BRAND_MODULE } from "../modules/brand";

function toHandle(name: string): string {
  return slugify(name, { lower: true, strict: true, locale: "ru" });
}

export default async function generateBrandHandles({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const brandService = container.resolve(BRAND_MODULE);

  const brands = await brandService.listBrands(
    {},
    { select: ["id", "name", "handle"] },
  );

  logger.info(`Found ${brands.length} brands`);

  let updated = 0;

  for (const brand of brands) {
    const handle = toHandle(brand.name);

    if (brand.handle === handle) {
      continue;
    }

    await brandService.updateBrands({ id: brand.id, handle });
    logger.info(`Updated "${brand.name}" → handle: "${handle}"`);
    updated++;
  }

  logger.info(`Done. Updated ${updated} of ${brands.length} brands.`);
}
