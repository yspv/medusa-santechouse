import React from "react";
import { useBrandTableColumns } from "./use-brand-table-columns";
import {
  DataTable,
  DataTablePaginationState,
  Heading,
  useDataTable,
} from "@medusajs/ui";
import { useBrandTableQuery } from "./use-brand-table-query";
import { useBrands } from "../../../../hooks/api/brands";
import { keepPreviousData } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 20;

export const BrandListTable = () => {
  const { t } = useTranslation();
  const [pagination, setPagination] = React.useState<DataTablePaginationState>({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  });
  const navigate = useNavigate();
  const { searchParams } = useBrandTableQuery({ pageSize: PAGE_SIZE });

  const query = searchParams;

  const { brands, count, isLoading } = useBrands(
    { ...query },
    { placeholderData: keepPreviousData },
  );

  const columns = useColumns();

  const table = useDataTable({
    columns,
    data: brands || [],
    getRowId: (row) => row.id,
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
        <Heading>{t("brands.domain")}</Heading>
      </DataTable.Toolbar>
      <DataTable.Table />
      <DataTable.Pagination />
    </DataTable>
  );
};

const useColumns = () => {
  const base = useBrandTableColumns();
  return React.useMemo(() => base, [base]);
};
