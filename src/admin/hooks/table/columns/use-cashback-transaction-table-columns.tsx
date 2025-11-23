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
