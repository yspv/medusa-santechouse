import React from "react";
import { createDataTableColumnHelper } from "@medusajs/ui";
import { AdminCustomer } from "@medusajs/framework/types";
import {
  PhoneCell,
  PhoneHeader,
} from "@/components/table/table-cells/customer";
import {
  NameCell,
  NameHeader,
} from "@/components/table/table-cells/common/name-cell";
import {
  DateCell,
  DateHeader,
} from "@/components/table/table-cells/common/date-cell";

export const customerColumnHelper =
  createDataTableColumnHelper<AdminCustomer>();

export const useCustomerTableColumns = () => {
  return React.useMemo(
    () => [
      customerColumnHelper.accessor("phone", {
        header: () => <PhoneHeader />,
        cell: ({ row }) => <PhoneCell customer={row.original} />,
      }),
      customerColumnHelper.display({
        id: "name",
        header: () => <NameHeader />,
        cell: ({ row }) => (
          <NameCell
            firstName={row.original.first_name}
            lastName={row.original.last_name}
          />
        ),
      }),
      customerColumnHelper.accessor("created_at", {
        header: () => <DateHeader />,
        cell: ({ row }) => <DateCell date={row.original.created_at} />,
      }),
    ],
    [],
  );
};
