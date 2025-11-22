export const adminPriceConversionsFields = [
  "id",
  "from",
  "to",
  "rate",
  "created_at",
];

export const retrievePriceConversionConfig = {
  defaults: adminPriceConversionsFields,
  isList: false,
};

export const listPriceConversionsConfig = {
  ...retrievePriceConversionConfig,
  defaultLimit: 50,
  isList: true,
};
