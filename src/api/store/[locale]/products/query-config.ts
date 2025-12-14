export const defaultStoreLocaleProductsFields = [
  "id",
  "thumbnail",
  "images",
  "variants.*",
  "payload_product.title",
  "payload_product.subtitle",
];

export const retriveLocaleProductConfig = {
  defaults: defaultStoreLocaleProductsFields,
  isList: false,
};

export const listLocaleProductConfig = {
  ...retriveLocaleProductConfig,
  defaultLimit: 50,
  isList: true,
};
