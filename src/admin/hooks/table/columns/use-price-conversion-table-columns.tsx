import React from "react";
import { createDataTableColumnHelper } from "@medusajs/ui";
import { AdminPriceConversion } from "@/types";
import {
  FromCell,
  FromHeader,
  RateCell,
  RateHeader,
  ToCell,
  ToHeader,
} from "@/components/table/table-cells/price-conversion";
import {
  DateCell,
  DateHeader,
} from "@/components/table/table-cells/common/date-cell";

const columnHelper = createDataTableColumnHelper<AdminPriceConversion>();

export const usePriceConversionTableColumns = () => {
  return React.useMemo(
    () => [
      columnHelper.accessor("created_at", {
        header: () => <DateHeader />,
        cell: ({ row }) => <DateCell date={row.original.created_at} />,
      }),
      columnHelper.accessor("from", {
        header: () => <FromHeader />,
        cell: ({ row }) => <FromCell from={row.original.from} />,
      }),
      columnHelper.accessor("to", {
        header: () => <ToHeader />,
        cell: ({ row }) => <ToCell to={row.original.to} />,
      }),
      columnHelper.accessor("rate", {
        header: () => <RateHeader />,
        cell: ({ row }) => <RateCell rate={row.original.rate} />,
      }),
    ],
    [],
  );
};
