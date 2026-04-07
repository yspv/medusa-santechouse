import { ExecArgs } from "@medusajs/framework/types";
import { TRANSLATION_MODULE } from "@medusajs/medusa/translation";

export default async function ({ container }: ExecArgs) {
  const localeModuleService = container.resolve(TRANSLATION_MODULE);
  await localeModuleService.createLocales({
    code: "uz-UZ",
    name: "Uzbek (Uzbekistan)",
  });
}
