import ProductMediaModuleService from "./service";
import { Module } from "@medusajs/framework/utils";

export const PRODUCT_MEDIA_MODULE = "product_media";

export default Module(PRODUCT_MEDIA_MODULE, {
  service: ProductMediaModuleService,
});
