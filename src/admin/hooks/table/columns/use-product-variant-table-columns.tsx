import React from "react";
import { createDataTableColumnHelper } from "@medusajs/ui";
import { AdminProductVariant } from "@medusajs/framework/types";
import {
  ProductCell,
  ProductHeader,
} from "@/components/table/table-cells/product/product-cell";
import {
  SkuCell,
  SkuHeader,
  VariantCell,
  VariantHeader,
} from "@/components/table/table-cells/product-variant";
import {
  DateCell,
  DateHeader,
} from "@/components/table/table-cells/common/date-cell";

const columnHelper = createDataTableColumnHelper<AdminProductVariant>();

export const useProductVariantTableColumns = () => {
  return React.useMemo(
    () => [
      columnHelper.accessor("product", {
        header: () => <ProductHeader />,
        cell: ({ row }) => <ProductCell product={row.original.product} />,
        enableSorting: true,
      }),
      columnHelper.accessor("title", {
        header: () => <VariantHeader />,
        cell: ({ row }) => <VariantCell variant={row.original.title} />,
      }),
      columnHelper.accessor("sku", {
        header: () => <SkuHeader />,
        cell: ({ row }) => <SkuCell sku={row.original.sku} />,
      }),
      columnHelper.accessor("created_at", {
        header: () => <DateHeader />,
        cell: ({ row }) => <DateCell date={row.original.created_at} />,
      }),
    ],
    [],
  );
};
