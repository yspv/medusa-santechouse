export const defualtAdminCashbackAccountsFields = [
  "id",
  "currency_code",
  "total_earned",
  "total_redeemed",
  "balance",
  "is_active",
  "metadata",
  "*transactions",
  "created_at",
  "updated_at",
];

export const retrieveCashbackAccountConfig = {
  defaults: defualtAdminCashbackAccountsFields,
  isList: false,
};

export const listCashbackAccountsConfig = {
  ...retrieveCashbackAccountConfig,
  defaultLimit: 50,
  isList: true,
};
