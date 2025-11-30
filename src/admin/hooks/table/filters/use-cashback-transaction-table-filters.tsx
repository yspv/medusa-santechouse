import { DataTableFilter } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import React from "react";

export const useCashbackTransactionTableFilters = (): DataTableFilter[] => {
  const { t } = useTranslation();
  const types = ["earned", "redeemed", "adjustment"];
  return React.useMemo<DataTableFilter[]>(
    () => [
      {
        id: "type",
        label: t("cashback-transactions.fields.type.label"),
        options: types.map((type) => ({
          label: t(`cashback-transactions.fields.type.${type}`),
          value: type,
        })),
        type: "select",
        mutiple: true,
      },
    ],
    [types],
  );
};
