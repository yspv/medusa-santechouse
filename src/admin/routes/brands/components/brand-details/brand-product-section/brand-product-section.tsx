import React from "react";
import { useProductTableColumns } from "../../../../../hooks/table/columns/use-product-table-columns";
import {
  Container,
  DataTable,
  DataTablePaginationState,
  Heading,
  useDataTable,
} from "@medusajs/ui";
import { AdminBrand } from "../../../../../../types/http";
import { useTranslation } from "react-i18next";

type BrandProductSectionProps = {
  brand: AdminBrand;
};

export const PAGE_SIZE = 20;

export const BrandProductSection = (props: BrandProductSectionProps) => {
  const { brand } = props;
  const [pagination, setPagination] = React.useState<DataTablePaginationState>({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  });
  const { t } = useTranslation();
  const columns = useColumns();
  const table = useDataTable({
    data: brand.products || [],
    getRowId: (row) => row.id,
    rowCount: brand.products?.length || 0,
    columns,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
  });
  return (
    <Container className="divide-y p-0">
      <DataTable instance={table}>
        <DataTable.Toolbar>
          <Heading level="h2">{t("products.domain")}</Heading>
        </DataTable.Toolbar>
        <DataTable.Table />
        <DataTable.Pagination />
      </DataTable>
    </Container>
  );
};

const useColumns = () => {
  const base = useProductTableColumns();
  return React.useMemo(() => base, [base]);
};
