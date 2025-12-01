export const defualtAdminCashbackAccountsFields = [
  "id",
  "customer.*",
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

export const defaultAdminCashbackTransactionsFields = [
  "id",
  "type",
  "amount",
  "reference_id",
  "currency_code",
  "metadata",
  "created_at",
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

export const retrieveCashbackTransactionConfig = {
  defaults: defaultAdminCashbackTransactionsFields,
  isList: false,
};

export const listCashbackTransactionConfig = {
  ...retrieveCashbackTransactionConfig,
  defaultLimit: 50,
  isList: true,
};
