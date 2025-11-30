import { BRAND_MODULE } from "@/modules/brand";
import { ExecArgs, LinkDefinition } from "@medusajs/types";
import productsData from "../../data/products.json";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function ({ container }: ExecArgs) {
  const productModuleService = container.resolve(Modules.PRODUCT);
  const brandModuleService = container.resolve(BRAND_MODULE);
  const linking = container.resolve(ContainerRegistrationKeys.LINK);
  const products = await productModuleService.listProducts(
    {},
    { select: ["id", "metadata"] },
  );
  const brands = await brandModuleService.listBrands(
    {},
    { select: ["id", "name"] },
  );

  const brandMap = brands.reduce((acc, brand) => {
    acc.set(brand.name.toLowerCase(), brand.id);
    return acc;
  }, new Map<string, string>());

  const productMap = products.reduce((acc, product) => {
    const oldId = product.metadata?.["old_id"];
    if (!oldId) return acc;
    acc.set(oldId as number, product.id);
    return acc;
  }, new Map<number, string>());

  const links: LinkDefinition[] = [];

  for (const input of productsData) {
    if (!input.brand_name) continue;
    const productId = productMap.get(input.product_id);
    const brandId = brandMap.get(input.brand_name.toLowerCase());
    if (!productId || !brandId) continue;
    links.push({
      [Modules.PRODUCT]: { product_id: productId },
      [BRAND_MODULE]: { brand_id: brandId },
    });
  }
  await linking.create(links);
}
