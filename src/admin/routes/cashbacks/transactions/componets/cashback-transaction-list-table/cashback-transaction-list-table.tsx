import React from "react";
import { useTranslation } from "react-i18next";
import {
  DataTable,
  DataTablePaginationState,
  Heading,
  useDataTable,
} from "@medusajs/ui";
import { useNavigate } from "react-router-dom";
import { useCashbackTransactions } from "@/hooks/api/cashback-transactions";
import { keepPreviousData } from "@tanstack/react-query";
import { useCashbackTransactionTableColumns } from "@/hooks/table/columns";
import { useCashbackTransactionTableQuery } from "@/hooks/table/query";

const PAGE_SIZE = 20;

export const CashbackTransactionListTable = () => {
  const { t } = useTranslation();
  const [pagination, setPagination] = React.useState<DataTablePaginationState>({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  });
  const navigate = useNavigate();
  const { searchParams } = useCashbackTransactionTableQuery({
    pageSize: PAGE_SIZE,
  });

  const query = searchParams;

  const { cashback_transactions, count, isLoading } = useCashbackTransactions(
    { ...query },
    { placeholderData: keepPreviousData },
  );

  const columns = useColumns();

  const table = useDataTable({
    columns,
    data: cashback_transactions || [],
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
        <Heading>{t("cashback-transactions.domain")}</Heading>
      </DataTable.Toolbar>
      <DataTable.Table />
      <DataTable.Pagination />
    </DataTable>
  );
};

const useColumns = () => {
  const base = useCashbackTransactionTableColumns();
  return React.useMemo(() => [...base], [base]);
};
