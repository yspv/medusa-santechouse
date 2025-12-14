import {
  createFindParams,
  createSelectParams,
} from "@medusajs/medusa/api/utils/validators";

export const StoreLocaleProductParams = createSelectParams();

export const StoreLocaleProductsParams = createFindParams({
  limit: 50,
  offset: 0,
});
