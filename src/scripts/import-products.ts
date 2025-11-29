import {
  CreateProductWorkflowInputDTO,
  ExecArgs,
  ProductCategoryDTO,
  SalesChannelDTO,
  ShippingProfileDTO,
} from "@medusajs/types";
import productsData from "../../data/products.json";
import { Modules } from "@medusajs/utils";
import { detectColor, generateSku, toHandle } from "./utils";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";

function buildCategoryMap(categories: ProductCategoryDTO[]) {
  return categories.reduce((map, cat) => {
    const oldId = cat.metadata?.old_id;
    if (oldId) map.set(oldId as number, cat);
    return map;
  }, new Map<number, ProductCategoryDTO>());
}

function resolveCategories(
  ids: number[],
  categoryMap: Map<number, ProductCategoryDTO>,
) {
  return [...new Set(ids)]
    .map((id) => categoryMap.get(id))
    .filter((c): c is ProductCategoryDTO => Boolean(c));
}

function buildTitle(
  baseCategory: ProductCategoryDTO | undefined,
  color?: string | null,
) {
  if (!baseCategory) return "По умолчанию";
  return color ? `${baseCategory.name} / ${color}` : baseCategory.name;
}

function buildOptions(color?: string | null) {
  return [
    color
      ? { title: "Цвет", values: [color] }
      : { title: "Размер", values: ["по умолчанию"] },
  ];
}

function buildVariant(
  old_id: number,
  baseCategory: ProductCategoryDTO | undefined,
  sku: string,
  color: string | null,
  currency_code: string,
  amount: number,
) {
  return {
    title: buildTitle(baseCategory, color),
    sku,
    allow_backorder: true,
    manage_inventory: false,
    metadata: { old_id: old_id },
    options: (color
      ? {
          ["Цвет"]: color,
        }
      : {
          ["Размер"]: "по умолчанию",
        }) as any,
    prices: [
      {
        currency_code: currency_code.toLowerCase()!,
        amount: amount,
      },
    ],
  };
}

function normalizeProducts(
  data: typeof productsData,
  categories: ProductCategoryDTO[],
  shippingProfile: ShippingProfileDTO,
  salesChannel: SalesChannelDTO,
) {
  const normalized: CreateProductWorkflowInputDTO[] = [];
  const categoryMap = buildCategoryMap(categories);

  for (const product of data) {
    const resolvedCategories = resolveCategories(
      product.category_ids,
      categoryMap,
    );
    const baseCategory = resolvedCategories.at(-1);
    const color = detectColor(`${product.description}`);

    const title = `${product.title}`;

    const sku = generateSku({
      sku_id: product.sku_id,
      brand: product.brand_name,
      categories: resolvedCategories,
      options: color ? [color] : undefined,
    });

    normalized.push({
      title,
      handle: toHandle(`${product.title}-${product.product_id}`),
      description: `${product.description}`,
      status: "published",
      category_ids: resolvedCategories.map((c) => c.id),
      discountable: true,
      is_giftcard: false,
      shipping_profile_id: shippingProfile.id,
      sales_channels: [{ id: salesChannel.id }],
      options: buildOptions(color),
      metadata: { old_id: product.product_id },
      variants: [
        buildVariant(
          product.sku_id,
          baseCategory,
          sku,
          color,
          product.currency_code,
          product.sale_amount,
        ),
      ],
    });
  }

  return normalized;
}

export default async function ({ container }: ExecArgs) {
  const salesChannelService = container.resolve(Modules.SALES_CHANNEL);
  const productService = container.resolve(Modules.PRODUCT);
  const fulfillmentService = container.resolve(Modules.FULFILLMENT);

  const [defaultSalesChannel] = await salesChannelService.listSalesChannels({
    name: "Default Sales Channel",
  });

  const [defaultShippingProfile] =
    await fulfillmentService.listShippingProfiles({ type: "default" });

  const categories = await productService.listProductCategories(
    {},
    { select: ["id", "name", "metadata"] },
  );

  const normalizedProducts = normalizeProducts(
    productsData,
    categories,
    defaultShippingProfile,
    defaultSalesChannel,
  );

  await createProductsWorkflow(container).run({
    input: { products: normalizedProducts },
  });
}
