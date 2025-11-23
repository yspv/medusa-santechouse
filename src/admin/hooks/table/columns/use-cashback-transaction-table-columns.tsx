import { AdminCashbackTransaction } from "@/types";
import { createDataTableColumnHelper } from "@medusajs/ui";
import React from "react";
import {
  AccountCell,
  AccountHeader,
  AmountCell,
  AmountHeader,
  ReferenceCell,
  ReferenceHeader,
  TypeCell,
  TypeHeader,
} from "@/components/table/table-cells/cashback-transaction";
import {
  DateCell,
  DateHeader,
} from "@/components/table/table-cells/common/date-cell";

const columnHelper = createDataTableColumnHelper<AdminCashbackTransaction>();

export const useCashbackTransactionTableColumns = () => {
  return React.useMemo(
    () => [
      columnHelper.accessor("account", {
        header: () => <AccountHeader />,
        cell: ({ row }) => <AccountCell account={row.original.account!} />,
      }),
      columnHelper.accessor("type", {
        header: () => <TypeHeader />,
        cell: ({ row }) => <TypeCell type={row.original.type} />,
      }),
      columnHelper.accessor("amount", {
        header: () => <AmountHeader />,
        cell: ({ row }) => (
          <AmountCell
            amount={row.original.amount}
            currencyCode={row.original.currency_code}
          />
        ),
      }),
      columnHelper.accessor("created_at", {
        header: () => <DateHeader />,
        cell: ({ row }) => <DateCell date={row.original.created_at} />,
      }),
      columnHelper.accessor("reference_id", {
        header: () => <ReferenceHeader />,
        cell: ({ row }) => (
          <ReferenceCell reference_id={row.original.reference_id} />
        ),
      }),
    ],
    [],
  );
};
