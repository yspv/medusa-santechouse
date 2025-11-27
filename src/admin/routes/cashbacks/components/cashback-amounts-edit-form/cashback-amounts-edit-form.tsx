import { Button, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { RouteFocusModal } from "@/components/modals/route-focus-modal";
import { AdminCashback } from "@/types";
import { KeyboundForm } from "@/components/utils/keybound-form";
import { useTranslation } from "react-i18next";
import { CashbackAmountsEditSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CashbackAmountsForm } from "../cashback-amounts-form";
import { useBatchCashbackAmounts } from "@/hooks/api";
import { useRouteModal } from "@/components/modals/route-modal-provider";
import { calculateAmountChanges, mapAmountsToRecord } from "../../helpers";

type CashbackAmountsEditFormProps = {
  cashback: AdminCashback;
};

export const CashbackAmountsEditForm = ({
  cashback,
}: CashbackAmountsEditFormProps) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm<CashbackAmountsEditSchema>({
    defaultValues: {
      cashbacks: [cashback].map((c) => ({
        title: c.product_variant?.sku || "-",
        amounts: mapAmountsToRecord(c.amounts || []),
      })),
    },
    resolver: zodResolver(CashbackAmountsEditSchema),
  });
  const { mutateAsync: batchCashbackAmounts } = useBatchCashbackAmounts(
    cashback.id,
  );
  const isPending = false;
  const handleSubmit = form.handleSubmit(async (values) => {
    const formAmounts = values.cashbacks[0].amounts || {};
    const changes = calculateAmountChanges(cashback.amounts || [], formAmounts);
    await batchCashbackAmounts(changes, {
      onSuccess: () => {
        handleSuccess();
      },
      onError: (error) => {
        toast(error.message);
      },
    });
  });
  return (
    <RouteFocusModal.Form form={form}>
      <KeyboundForm
        onSubmit={handleSubmit}
        className="flex size-full flex-col overflow-hidden"
      >
        <RouteFocusModal.Header></RouteFocusModal.Header>
        <RouteFocusModal.Body className="flex size-full flex-col overflow-auto">
          <CashbackAmountsForm form={form} />
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
            type="submit"
            isLoading={isPending}
          >
            {t("actions.save")}
          </Button>
        </RouteFocusModal.Footer>
      </KeyboundForm>
    </RouteFocusModal.Form>
  );
};
