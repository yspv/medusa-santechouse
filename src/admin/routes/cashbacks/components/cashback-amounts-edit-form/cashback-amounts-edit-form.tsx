import { Button } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { RouteFocusModal } from "@/components/modals/route-focus-modal";
import { AdminCashback } from "@/types";
import { KeyboundForm } from "@/components/utils/keybound-form";
import { useTranslation } from "react-i18next";
import { CashbackAmountsEditSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CashbackAmountsForm } from "../cashback-amounts-form";

type CashbackAmountsEditFormProps = {
  cashback: AdminCashback;
};
export const CashbackAmountsEditForm = ({
  cashback,
}: CashbackAmountsEditFormProps) => {
  const { t } = useTranslation();
  const form = useForm<CashbackAmountsEditSchema>({
    defaultValues: {
      cashbacks: [cashback].map((c) => ({
        title: c.product_variant?.sku || "-",
        amounts: c.amounts?.reduce((acc, amount) => {
          acc[amount.currency_code] = amount.amount;
          return acc;
        }, {}),
      })),
    },
    resolver: zodResolver(CashbackAmountsEditSchema),
  });
  const isPending = false;
  const handleSubmit = form.handleSubmit(() => {});
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
