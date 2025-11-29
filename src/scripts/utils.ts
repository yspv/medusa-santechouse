import slugify from "slugify";
import { ProductCategoryDTO } from "@medusajs/types";
import _ from "lodash";

const russianColors = [
  "красный",
  "алый",
  "малиновый",
  "огненный",
  "жёлтый",
  "золотой",
  "оранжевый",
  "синий",
  "голубой",
  "индиго",
  "фиолетовый",
  "сиреневый",
  "зелёный",
  "салатовый",
  "оливковый",
  "изумрудный",
  "белый",
  "чёрный",
  "хром",
  "серый",
  "серебристый",
  "коричневый",
  "бежевый",
  "розовый",
  "фуксия",
  "пурпурный",
  "бирюзовый",
  "коралловый",
];

export function detectColor(text: string) {
  const lowerText = text.toLowerCase();

  for (const colorName of russianColors) {
    if (lowerText.includes(colorName)) {
      return _.upperFirst(colorName);
    }
  }

  return null;
}

export function toHandle(value: string) {
  return slugify(value, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    strict: true,
  }).normalize("NFKD");
}

export function containsNumber(str: string) {
  const regex = /\d/;
  return regex.test(str);
}

export function generateSku(data: {
  sku_id: number;
  brand: string;
  categories: ProductCategoryDTO[];
  options?: string[];
}) {
  const { sku_id, brand, categories, options } = data;
  const sku: string[] = [];
  if (options) {
    const prefix = options.map((c) => toHandle(c).slice(0, 3).toUpperCase());
    sku.push(prefix.join("-"));
  }
  sku.push(brand.slice(0, 3).toUpperCase());
  const skuCategory: string[] = [];
  for (const category of categories) {
    const chunks = category.name.split(" ");
    const slugs =
      chunks.length < 2
        ? chunks.map((c) =>
            containsNumber(c) ? toHandle(c) : toHandle(c.slice(0, 3)),
          )
        : chunks
            .filter((c) => c.length > 3)
            .map((c) =>
              containsNumber(c) ? toHandle(c) : toHandle(c.slice(0, 3)),
            );

    if (!slugs.length) continue;

    skuCategory.push(...slugs.map((c) => c.toUpperCase()));
  }
  sku.push([...new Set(skuCategory), sku_id].join("-"));
  return sku.join("-");
}
