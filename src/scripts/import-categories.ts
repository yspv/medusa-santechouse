import {
  CreateProductCategoryDTO,
  ExecArgs,
  ProductCategoryDTO,
} from "@medusajs/framework/types";
import categoriesData from "../../data/categories.json";
import slugify from "slugify";
import { createProductCategoriesWorkflow } from "@medusajs/medusa/core-flows";

slugify.extend({ "°": "o", "/": "-" });

const toHandle = (value: string) => {
  return slugify(value, {
    remove: /[*+~.()'"!:@]/g,
  }).toLowerCase();
};

export default async function ({ container }: ExecArgs) {
  const categoryMap = new Map<number, ProductCategoryDTO>();
  for (let level = 1; level < 4; level++) {
    const categories = categoriesData.filter((c) => c.level === level);
    const normalized = categories.map<CreateProductCategoryDTO>((category) => {
      if (level > 1) {
        const parent = categoryMap.get(category.parent_id as number);
        const handle = toHandle(
          `${category.parent_name} ${category.category_name}`,
        );
        return {
          parent_category_id: parent?.id,
          name: `${category.category_name}`,
          is_active: true,
          handle: handle,
          metadata: {
            old_id: category.id,
          },
        };
      }
      return {
        name: `${category.category_name}`,
        handle: toHandle(`${category.category_name}`),
        is_active: true,
        metadata: {
          old_id: category.id,
        },
      };
    });
    const { result: created } = await createProductCategoriesWorkflow(
      container,
    ).run({
      input: {
        product_categories: normalized,
      },
    });
    created.forEach((category) => {
      const oldId = category.metadata?.["old_id"];
      categoryMap.set(oldId as number, category);
    });
  }
}
