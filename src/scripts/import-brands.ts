import { createBrandsWorkflow } from "@/workflows/brand/workflows";
import brandsData from "../../data/brands.json";
import { ExecArgs } from "@medusajs/framework/types";

export default async function ({ container }: ExecArgs) {
  await createBrandsWorkflow(container).run({
    input: brandsData.map((brand) => ({ ...brand, is_active: true })),
  });
}
