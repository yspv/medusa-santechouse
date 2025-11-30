import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Button, toast } from "@medusajs/ui";
import { RouteDrawer } from "@/components/modals/route-drawer/route-drawer";
import { KeyboundForm } from "@/components/utils/keybound-form";
import { CashbackAccountEditSchema } from "../../constants";
import { AdminCashbackAccount } from "@/types";
import { SwitchBox } from "@/components/common/switch-box";
import { useUpdateCashbackAccount } from "@/hooks/api";
import { useRouteModal } from "@/components/modals/route-modal-provider";

type Props = {
  account: AdminCashbackAccount;
};

export const CashbackAccountEditForm = ({ account }: Props) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();

  const form = useForm<CashbackAccountEditSchema>({
    defaultValues: {
      is_active: account.is_active,
    },
    resolver: zodResolver(CashbackAccountEditSchema),
  });

  const { mutateAsync, isPending } = useUpdateCashbackAccount(account.id);

  const handleSubmit = form.handleSubmit(async (values) => {
    mutateAsync(values, {
      onSuccess: () => {
        toast.success(t("cashback-accounts.edit.successToast"));
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
              label={t("fields.status")}
              description={t("cashback-accounts.fields.status.hint")}
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
