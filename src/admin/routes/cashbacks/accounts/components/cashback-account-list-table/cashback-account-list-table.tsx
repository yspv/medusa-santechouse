import React from "react";
import { createDataTableColumnHelper } from "@medusajs/ui";
import { useCashbackAccountColumns } from "@/hooks/table/columns";
import { AdminCashbackAccount } from "@/types";
import { ActionMenu } from "@/components/common/action-menu";
import { useTranslation } from "react-i18next";
import { useCashbackAccounts } from "@/hooks/api";
import { keepPreviousData } from "@tanstack/react-query";
import { useCashbackAccountTableQuery } from "@/hooks/table/query";
import { DataTable } from "@/components/common/data-table";

const PAGE_SIZE = 20;

export const CashbackAccountListTable = () => {
  const { t } = useTranslation();

  const { searchParams } = useCashbackAccountTableQuery({
    pageSize: PAGE_SIZE,
  });

  const { cashback_accounts, count, isLoading } = useCashbackAccounts(
    { ...searchParams },
    { placeholderData: keepPreviousData },
  );

  const columns = useColumns();

  return (
    <DataTable
      heading={t("cashback-accounts.domain")}
      columns={columns}
      data={cashback_accounts}
      isLoading={isLoading}
      getRowId={(row) => row.id}
      rowHref={(row) => row.id}
      pageSize={PAGE_SIZE}
      rowCount={count}
      enableSearch={false}
    />
  );
};

const CashbackAccountActions = (props: { account: AdminCashbackAccount }) => {
  return <ActionMenu groups={[]} />;
};

const columnHelper = createDataTableColumnHelper<AdminCashbackAccount>();
const useColumns = () => {
  const base = useCashbackAccountColumns();
  return React.useMemo(
    () => [
      ...base,
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => <CashbackAccountActions account={row.original} />,
      }),
    ],
    [base],
  );
};
