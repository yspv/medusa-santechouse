import {
  AdminBatchUpdateCashbackAmount,
  AdminCashbackAmount,
  AdminCreateCashbackAmount,
} from "@/types";
import _ from "lodash";

export const mapAmountsToRecord = (
  amounts: AdminCashbackAmount[] | undefined,
): Record<string, number | string> => {
  return (amounts || []).reduce(
    (acc, { currency_code, amount }) => {
      acc[currency_code] = amount;
      return acc;
    },
    {} as Record<string, number | string>,
  );
};

export const calculateAmountChanges = (
  originalAmounts: AdminCashbackAmount[],
  formAmounts: Record<string, number | string>,
) => {
  const amountsMap = new Map(originalAmounts.map((a) => [a.currency_code, a]));

  const changes = {
    create: [] as AdminCreateCashbackAmount[],
    update: [] as AdminBatchUpdateCashbackAmount[],
    delete: [] as string[],
  };

  for (const [code, value] of Object.entries(formAmounts)) {
    const originalAmount = amountsMap.get(code);
    const numValue = Number(value);
    const isEmpty = !value || value === "";

    if (originalAmount && isEmpty) {
      changes.delete.push(originalAmount.id);
    } else if (originalAmount && originalAmount.amount !== numValue) {
      changes.update.push({ id: originalAmount.id, amount: numValue });
    } else if (!originalAmount && !isEmpty) {
      changes.create.push({ currency_code: code, amount: numValue });
    }
  }

  return changes;
};
