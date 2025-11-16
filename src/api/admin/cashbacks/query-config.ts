export const defaultAdminCashbacksFields = [
  "id",
  "*amounts",
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
