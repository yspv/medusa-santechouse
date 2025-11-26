import { useForm } from "react-hook-form";
import { RouteDrawer } from "@/components/modals/route-drawer/route-drawer";
import { KeyboundForm } from "@/components/utils/keybound-form";
import { AdminCashback } from "@/types";
import { Button, toast } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { SwitchBox } from "@/components/common/switch-box";
import { CashbackEditSchema, CAshbackEditSchema } from "./schema";
import { useUpdateCashback } from "@/hooks/api";
import { useRouteModal } from "@/components/modals/route-modal-provider";

type CashbackEditFormProps = {
  cashback: AdminCashback;
};

export const CashbackEditForm = ({ cashback }: CashbackEditFormProps) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();

  const form = useForm<CAshbackEditSchema>({
    defaultValues: {
      is_active: cashback.is_active,
    },
    resolver: zodResolver(CashbackEditSchema),
  });

  const { mutateAsync: updateCashback, isPending } = useUpdateCashback(
    cashback.id,
  );

  const handleSubmit = form.handleSubmit(async (values) => {
    await updateCashback(values, {
      onSuccess: () => {
        toast.success(t("cashbacks.edit.successToast"));
        handleSuccess();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  });

  return (
    <RouteDrawer.Form form={form}>
      <KeyboundForm onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <RouteDrawer.Body>
          <div className="flex flex-col gap-y-4">
            <SwitchBox
              control={form.control}
              name="is_active"
              label={t("cashbacks.fields.status.label")}
              description={t("cashbacks.fields.status.hint")}
            />
          </div>
        </RouteDrawer.Body>
        <RouteDrawer.Footer>
          <RouteDrawer.Close asChild>
            <Button size="small" variant="secondary">
              {t("actions.cancel")}
            </Button>
          </RouteDrawer.Close>
          <Button size="small" type="submit" isLoading={isPending}>
            {t("actions.save")}
          </Button>
        </RouteDrawer.Footer>
      </KeyboundForm>
    </RouteDrawer.Form>
  );
};
