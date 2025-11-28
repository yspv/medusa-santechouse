import { RouteFocusModal } from "@/components/modals/route-focus-modal";
import {
  Button,
  createDataTableColumnHelper,
  DataTableRowSelectionState,
  toast,
} from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { useCreateCashback, useVariants } from "@/hooks/api";
import { DataTable } from "@/components/common/data-table";
import { useProductVariantTableColumns } from "@/hooks/table/columns/use-product-variant-table-columns";
import React from "react";
import { AdminProductVariant } from "@medusajs/framework/types";
import { useProductVariantTableQuery } from "@/hooks/table/query";
import { useRouteModal } from "@/components/modals/route-modal-provider";
import { keepPreviousData } from "@tanstack/react-query";
import _ from "lodash";

const VARIANT_PREFIX = "variant";

export const CashbackCreateForm = () => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();

  const [rowSelection, setRowSelection] =
    React.useState<DataTableRowSelectionState>({});

  const columns = useColumns();

  const { searchParams } = useProductVariantTableQuery({
    pageSize: 20,
    prefix: VARIANT_PREFIX,
  });

  const {
    variants,
    count,
    isPending: isVariantsPending,
  } = useVariants(
    {
      ...searchParams,
    },
    { placeholderData: keepPreviousData },
  );

  const filteredVariants = React.useMemo(
    () => variants?.filter((v: any) => !v?.cashback),
    [variants],
  );

  const { mutateAsync: createCashback, isPending } = useCreateCashback();

  const handleSubmit = async () => {
    const [[variantId]] = _.toPairs(rowSelection);
    if (!variantId) {
      return;
    }
    await createCashback(
      { variant_id: variantId, amounts: [] },
      {
        onSuccess: ({ cashback }) => {
          handleSuccess(`/cashbacks/${cashback.id}/amounts`);
        },
        onError: (error) => {
          toast(error.message);
        },
      },
    );
  };

  return (
    <>
      <RouteFocusModal.Header>
        <RouteFocusModal.Title />
        <RouteFocusModal.Description />
      </RouteFocusModal.Header>
      <RouteFocusModal.Body className="flex size-full flex-col overflow-auto">
        <DataTable
          data={filteredVariants}
          columns={columns}
          getRowId={(row) => row.id}
          isLoading={isVariantsPending}
          pageSize={20}
          rowCount={count}
          prefix={VARIANT_PREFIX}
          layout="fill"
          rowSelection={{
            state: rowSelection,
            onRowSelectionChange: (value) => {
              const newValue = _.differenceWith(
                _.toPairs(value),
                _.toPairs(rowSelection),
                _.isEqual,
              );
              setRowSelection(_.fromPairs(newValue));
            },
          }}
          enablePagination={false}
          autoFocusSearch={true}
        />
      </RouteFocusModal.Body>
      <RouteFocusModal.Footer>
        <RouteFocusModal.Close asChild>
          <Button size="small" variant="secondary">
            {t("actions.cancel")}
          </Button>
        </RouteFocusModal.Close>
        <Button
          size="small"
          variant="primary"
          onClick={handleSubmit}
          isLoading={isPending}
        >
          {t("actions.save")}
        </Button>
      </RouteFocusModal.Footer>
    </>
  );
};

const columnHelper = createDataTableColumnHelper<AdminProductVariant>();
const useColumns = () => {
  const base = useProductVariantTableColumns();
  return React.useMemo(() => [columnHelper.select(), ...base], [base]);
};
