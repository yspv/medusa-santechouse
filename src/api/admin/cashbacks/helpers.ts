import {
  AdminCashback,
  AdminCashbackAmount,
  CashbackAmountDTO,
  CashbackDTO,
} from "@/types";

export const remapCashbackResponse = (cashback: CashbackDTO): AdminCashback => {
  return {
    ...cashback,
    amounts: cashback.amounts.map((c) => remapCashbackAmountResponse(c)),
  };
};

export const remapCashbackAmountResponse = (
  cashbackAmount: CashbackAmountDTO,
): AdminCashbackAmount => {
  return {
    ...cashbackAmount,
  };
};
