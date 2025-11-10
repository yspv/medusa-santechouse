import type { AdminBrandResponse } from "../../../../../types/http";
import { createDataTableColumnHelper } from "@medusajs/ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { getIsActiveProps } from "../../common/utils";
import { DataTableStatusCell } from "../../../../components/data-table/components/data-table-status-cell";

const columnHelper = createDataTableColumnHelper<AdminBrandResponse["brand"]>();

export const useBrandTableColumns = () => {
  const { t } = useTranslation();
  return React.useMemo(
    () => [
      columnHelper.accessor("name", {
        header: t("brands.columns.name"),
      }),
      columnHelper.accessor("is_active", {
        header: t("brands.columns.is_active"),
        cell: ({ getValue }) => {
          const { color, label } = getIsActiveProps(getValue(), t);
          return (
            <DataTableStatusCell color={color}>{label}</DataTableStatusCell>
          );
        },
      }),
    ],
    [t],
  );
};
