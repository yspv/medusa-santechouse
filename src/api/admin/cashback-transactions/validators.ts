import { createFindParams } from "@medusajs/medusa/api/utils/validators";

export const AdminCashbackTransactionsParams = createFindParams({
  offset: 0,
  limit: 50,
});
