import React from "react";
import { createDataTableColumnHelper } from "@medusajs/ui";
import { AdminBrand } from "@/types";
import {
  StatusCell,
  StatusHeader,
} from "@/components/table/table-cells/common/status-cell";
import { NameCell, NameHeader } from "@/components/table/table-cells/brand";
import {
  DateCell,
  DateHeader,
} from "@/components/table/table-cells/common/date-cell";

export const brandColumnHelper = createDataTableColumnHelper<AdminBrand>();

export const useBrandTableColumns = () => {
  return React.useMemo(
    () => [
      brandColumnHelper.accessor("name", {
        header: () => <NameHeader />,
        cell: ({ row }) => <NameCell name={row.original.name} />,
      }),
      brandColumnHelper.accessor("is_active", {
        header: () => <StatusHeader />,
        cell: ({ row }) => <StatusCell isActive={row.original.is_active} />,
      }),
      brandColumnHelper.accessor("created_at", {
        header: () => <DateHeader />,
        cell: ({ row }) => <DateCell date={row.original.created_at} />,
      }),
    ],
    [],
  );
};
