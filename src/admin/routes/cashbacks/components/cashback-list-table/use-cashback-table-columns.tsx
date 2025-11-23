import { createDataTableColumnHelper, StatusBadge } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { AdminCashbackResponse } from "../../../../../types/http";
import React from "react";
import { getIsActiveProps } from "../../../../lib/get-status-props";
import { CashbackAmountsCell } from "../../../../components/table/table-cells/cashback/cashback-amounts/cashback-amounts";

const columnHelper =
  createDataTableColumnHelper<AdminCashbackResponse["cashback"]>();

export const useCashbackTableColumns = () => {
  const { t } = useTranslation();
  return React.useMemo(
    () => [
      columnHelper.accessor("product_variant.sku", { header: t("fields.sku") }),
      columnHelper.accessor("amounts", {
        header: t("fields.currency"),
        cell: ({ row }) => (
          <CashbackAmountsCell amounts={row.original.amounts} />
        ),
      }),
      columnHelper.accessor("is_active", {
        header: t("fields.status"),
        cell: ({ row }) => {
          const { color, label } = getIsActiveProps(row.original.is_active, t);
          return <StatusBadge color={color}>{label}</StatusBadge>;
        },
      }),
      columnHelper.accessor("created_at", { header: t("fields.date") }),
    ],
    [t],
  );
};
