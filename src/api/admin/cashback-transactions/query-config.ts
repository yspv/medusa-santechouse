export const adminCashbackTransactionsFields = [
  "id",
  "type",
  "account.*",
  "account.customer.*",
  "currency_code",
  "amount",
  "created_at",
];

export const retrieveCashbackTransactionConfig = {
  defaults: adminCashbackTransactionsFields,
  isList: false,
};

export const listCashbackTransactionsConfig = {
  ...retrieveCashbackTransactionConfig,
  defaultLimit: 50,
  isList: true,
};
