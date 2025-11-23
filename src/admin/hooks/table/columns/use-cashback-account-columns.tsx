import React from "react";
import { useTranslation } from "react-i18next";
import { createDataTableColumnHelper } from "@medusajs/ui";
import { AdminCashbackAccount } from "../../../../types";
import {
  StatusCell,
  StatusHeader,
} from "@/components/table/table-cells/cashback-account/status-cell";
import {
  CustomerCell,
  CustomerHeader,
} from "@/components/table/table-cells/cashback-account/customer-cell";
import {
  BalanceCell,
  BalanceHeader,
} from "@/components/table/table-cells/cashback-account/balance-cell";
import {
  TotalEarnedCell,
  TotalEarnedHeader,
} from "@/components/table/table-cells/cashback-account/total-earned-cell";
import {
  TotalRedeemedCell,
  TotalRedeemedHeader,
} from "@/components/table/table-cells/cashback-account/total-redeemed-cell";

const columnHelper = createDataTableColumnHelper<AdminCashbackAccount>();

export const useCashbackAccountColumns = () => {
  const { t } = useTranslation();
  return React.useMemo(
    () => [
      columnHelper.accessor("customer", {
        header: () => <CustomerHeader />,
        cell: ({ row }) => <CustomerCell customer={row.original.customer} />,
      }),
      columnHelper.accessor("total_earned", {
        header: () => <TotalEarnedHeader />,
        cell: ({ row }) => (
          <TotalEarnedCell
            totalEarned={row.original.total_earned}
            currencyCode={row.original.currency_code}
          />
        ),
      }),
      columnHelper.accessor("total_redeemed", {
        header: () => <TotalRedeemedHeader />,
        cell: ({ row }) => (
          <TotalRedeemedCell
            totalRedeemed={row.original.total_redeemed}
            currencyCode={row.original.currency_code}
          />
        ),
      }),
      columnHelper.accessor("balance", {
        header: () => <BalanceHeader />,
        cell: ({ row }) => (
          <BalanceCell
            balance={row.original.balance}
            currencyCode={row.original.currency_code}
          />
        ),
      }),
      columnHelper.accessor("is_active", {
        header: () => <StatusHeader />,
        cell: ({ row }) => <StatusCell isActive={row.original.is_active} />,
      }),
    ],
    [t],
  );
};
