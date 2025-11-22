export const adminPriceConversionsFields = [
  "id",
  "from",
  "to",
  "rate",
  "created_at",
];

export const retrievePriceConversionConfig = {
  fields: adminPriceConversionsFields,
  isList: false,
};

export const listPriceConversionsConfig = {
  ...retrievePriceConversionConfig,
  defaultLimit: 50,
  isList: true,
};
