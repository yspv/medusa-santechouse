export const defaultAdminCashbacksFields = [
  "id",
  "*amounts",
  "is_active",
  "metadata",
  "created_at",
  "updated_at",
];

export const defualtAdminCashbackAmountsFields = [
  "id",
  "currency_code",
  "amount",
  "is_active",
  "metadata",
  "created_at",
  "updated_at",
];

export const retrieveCashbackConfig = {
  defaults: defaultAdminCashbacksFields,
  isList: false,
};

export const listCashbackConfig = {
  ...retrieveCashbackConfig,
  defaultLimit: 50,
  isList: true,
};

export const retrieveCashbackAmountConfig = {
  defaults: defualtAdminCashbackAmountsFields,
  isList: false,
};

export const listCashbackAmountConfig = {
  ...retrieveCashbackAmountConfig,
  defualtLimit: 50,
  isList: true,
};
