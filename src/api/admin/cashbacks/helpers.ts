import { AdminCashback, CashbackDTO } from "@/types";

export const remapCashbackResponse = (cashback: CashbackDTO): AdminCashback => {
  return {
    ...cashback,
  };
};
