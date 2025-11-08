import type { AdminBrandResponse } from "../../../../../types/http";
import { createDataTableColumnHelper } from "@medusajs/ui";
import React from "react";

const columnHelper = createDataTableColumnHelper<AdminBrandResponse["brand"]>();

export const useBrandTableColumns = () => {
  return React.useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor("is_active", {
        header: "Active",
      }),
    ],
    [],
  );
};
