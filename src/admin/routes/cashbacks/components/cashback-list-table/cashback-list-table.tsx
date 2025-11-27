import React from "react";
import { useTranslation } from "react-i18next";
import { useCashbacks } from "../../../../hooks/api/cashback";
import { keepPreviousData } from "@tanstack/react-query";
import { AdminCashback } from "../../../../../types/http";
import {
  cashbackColumnHelper,
  useCashbackTableColumns,
} from "@/hooks/table/columns";
import { ActionMenu } from "../../../../components/common/action-menu";
import { PencilSquare, Trash } from "@medusajs/icons";
import { DataTable } from "@/components/common/data-table";
import { useCashbackTableQuery } from "@/hooks/table/query";

const PAGE_SIZE = 20;

export const CashbackListTable = () => {
  const { t } = useTranslation();
  const { searchParams } = useCashbackTableQuery({ pageSize: PAGE_SIZE });
  const { cashbacks, count, isLoading } = useCashbacks(
    { ...searchParams },
    { placeholderData: keepPreviousData },
  );
  const columns = useColumns();
  return (
    <DataTable
      heading={t("cashbacks.domain")}
      columns={columns}
      data={cashbacks}
      isLoading={isLoading}
      getRowId={(row) => row.id}
      pageSize={PAGE_SIZE}
      rowCount={count}
      layout="fill"
      rowHref={(row) => `${row.id}`}
      action={{
        label: t("actions.create"),
        to: "create",
      }}
    />
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

const useColumns = () => {
  const base = useCashbackTableColumns();
  return React.useMemo(
    () => [
      ...base,
      cashbackColumnHelper.display({
        id: "actions",
        cell: ({ row }) => <CashbackActions cashback={row.original} />,
      }),
    ],
    [base],
  );
};
