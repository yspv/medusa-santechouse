import React from "react";
import { createDataTableColumnHelper } from "@medusajs/ui";
import { AdminCashback } from "@/types";
import {
  ProductHeader,
  ProductCell,
} from "@/components/table/table-cells/product/product-cell";
import {
  VariantCell,
  VariantHeader,
} from "@/components/table/table-cells/product-variant";
import {
  StatusCell,
  StatusHeader,
} from "@/components/table/table-cells/common/status-cell";
import {
  DateCell,
  DateHeader,
} from "@/components/table/table-cells/common/date-cell";
import {
  AmountsCell,
  AmountsHeader,
} from "@/components/table/table-cells/cashback";

export const cashbackColumnHelper =
  createDataTableColumnHelper<AdminCashback>();
export const useCashbackTableColumns = () => {
  return React.useMemo(
    () => [
      cashbackColumnHelper.accessor("product_variant.product", {
        header: () => <ProductHeader />,
        cell: ({ row }) => (
          <ProductCell product={row.original.product_variant?.product} />
        ),
      }),
      cashbackColumnHelper.accessor("product_variant.title", {
        header: () => <VariantHeader />,
        cell: ({ row }) => (
          <VariantCell variant={row.original.product_variant?.title ?? null} />
        ),
      }),
      cashbackColumnHelper.accessor("amounts", {
        header: () => <AmountsHeader />,
        cell: ({ row }) => <AmountsCell amounts={row.original.amounts} />,
      }),
      cashbackColumnHelper.accessor("is_active", {
        header: () => <StatusHeader />,
        cell: ({ row }) => <StatusCell isActive={row.original.is_active} />,
        enableSorting: true,
      }),
      cashbackColumnHelper.accessor("created_at", {
        header: () => <DateHeader />,
        cell: ({ row }) => <DateCell date={row.original.created_at} />,
        enableSorting: true,
      }),
    ],
    [],
  );
};
