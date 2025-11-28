import { AdminCashbackTransaction } from "@/types";
import { createDataTableColumnHelper, DataTableColumnDef } from "@medusajs/ui";
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

export const useCashbackTransactionTableColumns = (props: {
  exclude?: string[];
}) => {
  const { exclude = [] } = props ?? {};
  const columns = React.useMemo(
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

  const isAccessorColumnDef = (
    c: any,
  ): c is DataTableColumnDef<AdminCashbackTransaction> & {
    accessorKey: string;
  } => {
    return c.accessorKey !== undefined;
  };

  const isDisplayColumnDef = (
    c: any,
  ): c is DataTableColumnDef<AdminCashbackTransaction> & { id: string } => {
    return c.id !== undefined;
  };

  const shouldExclude = <
    TDef extends DataTableColumnDef<AdminCashbackTransaction, any>,
  >(
    c: TDef,
  ) => {
    if (isAccessorColumnDef(c)) {
      return exclude.includes(c.accessorKey);
    } else if (isDisplayColumnDef(c)) {
      return exclude.includes(c.id);
    }

    return false;
  };

  return columns.filter((c) => !shouldExclude(c));
};
