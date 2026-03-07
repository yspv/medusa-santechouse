import { ExecArgs } from "@medusajs/types";
import productsData from "../../data/products.json";
import { createCashbacksWorkflow } from "@/workflows/cashback/workflows";
import { CreateCashbackDTO } from "@/types";
import { Modules } from "@medusajs/framework/utils";
import { ProductVariantDTO } from "@medusajs/types";

export default async function ({ container }: ExecArgs) {
  const normalized: CreateCashbackDTO[] = [];
  const productService = container.resolve(Modules.PRODUCT);
  const variants = await productService.listProductVariants(
    {},
    { select: ["id", "metadata"] },
  );
  const variantMap = variants.reduce((acc, variant) => {
    const oldId = variant.metadata?.["old_id"];
    if (!oldId) return acc;
    acc.set(oldId as number, variant);
    return acc;
  }, new Map<number, ProductVariantDTO>());

  for (const product of productsData) {
    const variant = variantMap.get(product.sku_id);
    const amount = product.bonus_amount;
    const currency = product.bonus_currency_code;
    if (!amount || !currency || !variant) {
      continue;
    }
    normalized.push({
      variant_id: variant.id,
      amounts: [{ amount, currency_code: currency.toLowerCase() }],
    });
  }
  await createCashbacksWorkflow(container).run({
    input: { cashbacks: normalized },
  });
}
