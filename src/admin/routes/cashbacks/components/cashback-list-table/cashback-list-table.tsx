import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  createDataTableColumnHelper,
  DataTable,
  DataTablePaginationState,
  Heading,
  useDataTable,
} from "@medusajs/ui";
import { Link, useNavigate } from "react-router-dom";
import { useCashbackTableQuery } from "./use-cashback-table-query";
import { useCashbacks } from "../../../../hooks/api/cashback";
import { keepPreviousData } from "@tanstack/react-query";
import { AdminCashback } from "../../../../../types/http";
import { useCashbackTableColumns } from "./use-cashback-table-columns";
import { ActionMenu } from "../../../../components/common/action-menu";
import { PencilSquare, Trash } from "@medusajs/icons";

const PAGE_SIZE = 20;

export const CashbackListTable = () => {
  const { t } = useTranslation();
  const [pagination, setPagination] = React.useState<DataTablePaginationState>({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  });
  const navigate = useNavigate();
  const { searchParams } = useCashbackTableQuery({ pageSize: PAGE_SIZE });

  const query = searchParams;

  const { cashbacks, count, isLoading } = useCashbacks(
    { ...query },
    { placeholderData: keepPreviousData },
  );

  const columns = useColumns();

  const table = useDataTable({
    columns,
    data: cashbacks || [],
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
        <Heading>{t("cashbacks.domain")}</Heading>
      </DataTable.Toolbar>
      <DataTable.Table />
      <DataTable.Pagination />
    </DataTable>
  );
};

const CashbackActions = ({ cashback }: { cashback: AdminCashback }) => {
  const { t } = useTranslation();
  return (
    <ActionMenu
      groups={[
        {
          actions: [
            {
              label: t("actions.edit"),
              icon: <PencilSquare />,
              to: `${cashback.id}/edit`,
            },
            {
              label: t("actions.delete"),
              icon: <Trash />,
              onClick: () => {},
            },
          ],
        },
      ]}
    />
  );
};

const columnHelper = createDataTableColumnHelper<AdminCashback>();
const useColumns = () => {
  const base = useCashbackTableColumns();
  return React.useMemo(
    () => [
      ...base,
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => <CashbackActions cashback={row.original} />,
      }),
    ],
    [base],
  );
};
