import {
  Button,
  DataTable,
  DataTablePaginationState,
  Heading,
  useDataTable,
} from "@medusajs/ui";
import { usePriceConversionTableColumns } from "@/hooks/table/columns";
import { usePriceConversionTableQuery } from "@/hooks/table/query";
import { useTranslation } from "react-i18next";
import React from "react";
import { usePriceConversions } from "@/hooks/api";
import { Link, useNavigate } from "react-router-dom";

const PAGE_SIZE = 20;

export const PriceConversionsListTable = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pagination, setPagination] = React.useState<DataTablePaginationState>({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  });

  const { searchParams } = usePriceConversionTableQuery({
    pageSize: PAGE_SIZE,
  });

  const { price_conversions, count, isLoading } =
    usePriceConversions(searchParams);

  const columns = usePriceConversionTableColumns();

  const table = useDataTable({
    columns,
    data: price_conversions || [],
    rowCount: count || 0,
    onRowClick: (_, row) => navigate(`/brands/${row.id}`),
    isLoading,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
  });
  return (
    <DataTable instance={table}>
      <DataTable.Toolbar>
        <div className="flex justify-between w-full items-center">
          <Heading>{t("price-conversions.domain")}</Heading>
          <Link to="create">
            <Button size="small" variant="secondary">
              {t("actions.create")}
            </Button>
          </Link>
        </div>
      </DataTable.Toolbar>
      <DataTable.Table />
      <DataTable.Pagination />
    </DataTable>
  );
};
