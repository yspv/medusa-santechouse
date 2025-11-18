import { AdminCashbackAccount, CashbackAccountDTO } from "@/types";
import { CustomerDTO } from "@medusajs/framework/types";

export const remapCashbackAccountResponse = (
  account: CashbackAccountDTO,
): AdminCashbackAccount => {
  return {
    ...account,
  };
};
