import {
  createDataGridHelper,
  createDataGridPriceColumns,
  DataGrid,
} from "@/components/data-grid";
import { AdminCashback, AdminCashbackAmount } from "@/types";
import { AdminStore } from "@medusajs/framework/types";
import { useTranslation } from "react-i18next";
import { UseFormReturn, useWatch } from "react-hook-form";
import React from "react";
import { useRouteModal } from "@/components/modals/route-modal-provider";
import { useStore } from "@/hooks/api";

type CashbackAmountFormProps = {
  form: UseFormReturn<any>;
};

export const CashbackAmountsForm = ({ form }: CashbackAmountFormProps) => {
  const { store } = useStore();
  const amounts = useWatch({
    control: form.control,
    name: "cashbacks",
  }) as any;
  const columns = useColumns({ currencies: store?.supported_currencies });
  const { setCloseOnEscape } = useRouteModal();
  return (
    <DataGrid
      columns={columns as any}
      data={amounts}
      state={form}
      onEditingChange={(editing) => setCloseOnEscape(!editing)}
    />
  );
};

const columnHelper = createDataGridHelper<AdminCashback, any>();

const useColumns = (props: {
  currencies?: AdminStore["supported_currencies"];
}) => {
  const { currencies } = props;
  const { t } = useTranslation();
  return React.useMemo(
    () => [
      columnHelper.column({
        id: t("fields.sku"),
        header: t("fields.sku"),
        cell: (context) => {
          const entity = context.row.original;
          return (
            <DataGrid.ReadonlyCell context={context}>
              <div className="flex h-full w-full items-center gap-x-2 overflow-hidden">
                <span className="truncate">{entity.title}</span>
              </div>
            </DataGrid.ReadonlyCell>
          );
        },
      }),
      ...createDataGridPriceColumns<AdminCashbackAmount, any>({
        t,
        currencies: currencies?.map((c) => c.currency_code),
        getFieldName: (context, value) => {
          if (context.column.id?.startsWith("currency_prices")) {
            return `cashbacks.${context.row.index}.amounts.${value}`;
          }
          return `cashbacks.${context.row.index}.amounts.${value}`;
        },
      }),
    ],
    [t, currencies],
  );
};
