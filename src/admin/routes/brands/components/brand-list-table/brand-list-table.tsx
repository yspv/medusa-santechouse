import React from "react";
import { brandColumnHelper, useBrandTableColumns } from "@/hooks/table/columns";
import { toast, usePrompt } from "@medusajs/ui";
import { useBrandTableQuery } from "@/hooks/table/query";
import { useBrands, useDeleteBrand } from "../../../../hooks/api/brands";
import { keepPreviousData } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { AdminBrand } from "../../../../../types/http";
import { ActionMenu } from "../../../../components/common/action-menu";
import { PencilSquare, Trash } from "@medusajs/icons";
import { DataTable } from "@/components/common/data-table";

const PAGE_SIZE = 20;

export const BrandListTable = () => {
  const { t } = useTranslation();
  const { searchParams } = useBrandTableQuery({ pageSize: PAGE_SIZE });

  const { brands, count, isLoading } = useBrands(
    { ...searchParams },
    { placeholderData: keepPreviousData },
  );

  const columns = useColumns();

  return (
    <DataTable
      heading={t("brands.domain")}
      data={brands}
      columns={columns}
      isLoading={isLoading}
      getRowId={(row) => row.id}
      rowHref={(row) => row.id}
      pageSize={PAGE_SIZE}
      rowCount={count}
      enableSearch
    />
  );
};

const BrandActions = ({ brand }: { brand: AdminBrand }) => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const { mutateAsync } = useDeleteBrand(brand.id);
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("brands.delete.confirmation", { name: brand.name }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel"),
    });
    if (!res) return;
    await mutateAsync(undefined, {
      onSuccess: () => {
        toast.success(t("brands.delete.successToast", { name: brand.name }));
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <ActionMenu
      groups={[
        {
          actions: [
            {
              icon: <PencilSquare />,
              label: t("actions.edit"),
              to: `/brands/${brand.id}/edit`,
            },
          ],
        },
        {
          actions: [
            {
              icon: <Trash />,
              label: t("actions.delete"),
              onClick: handleDelete,
            },
          ],
        },
      ]}
    />
  );
};

const useColumns = () => {
  const base = useBrandTableColumns();
  return React.useMemo(
    () => [
      ...base,
      brandColumnHelper.display({
        id: "actions",
        cell: ({ row }) => <BrandActions brand={row.original} />,
      }),
    ],
    [base],
  );
};
