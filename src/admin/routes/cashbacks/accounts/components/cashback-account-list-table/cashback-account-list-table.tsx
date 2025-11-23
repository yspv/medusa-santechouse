import React from "react";
import {
  createDataTableColumnHelper,
  DataTable,
  DataTablePaginationState,
  Heading,
  useDataTable,
} from "@medusajs/ui";
import { useCashbackAccountColumns } from "@/hooks/table/columns";
import { AdminCashbackAccount } from "@/types";
import { ActionMenu } from "@/components/common/action-menu";
import { useTranslation } from "react-i18next";
import { useCashbackAccounts } from "@/hooks/api";
import { keepPreviousData } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCashbackAccountTableQuery } from "./use-cashback-account-table-query";

const PAGE_SIZE = 20;

export const CashbackAccountListTable = () => {
  const { t } = useTranslation();
  const [pagination, setPagination] = React.useState<DataTablePaginationState>({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  });
  const navigate = useNavigate();
  const { searchParams } = useCashbackAccountTableQuery({
    pageSize: PAGE_SIZE,
  });

  const query = searchParams;

  const { cashback_accounts, count, isLoading } = useCashbackAccounts(
    { ...query },
    { placeholderData: keepPreviousData },
  );

  const columns = useColumns();

  const table = useDataTable({
    columns,
    data: cashback_accounts || [],
    getRowId: (row) => row.id,
    rowCount: count || 0,
    onRowClick: (_, row) => navigate(`${row.id}`),
    isLoading,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
  });

  return (
    <DataTable instance={table}>
      <DataTable.Toolbar>
        <Heading>{t("cashback-accounts.domain")}</Heading>
      </DataTable.Toolbar>
      <DataTable.Table />
      <DataTable.Pagination />
    </DataTable>
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
