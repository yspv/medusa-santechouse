import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, CurrencyInput, Input, toast } from "@medusajs/ui";
import { RouteDrawer } from "@/components/modals/route-drawer/route-drawer";
import { CashbackAccountAdjustmentSchema } from "../../constants";
import { KeyboundForm } from "@/components/utils/keybound-form";
import { useAdjustmentCashbackAccount } from "@/hooks/api";
import { AdminCashbackAccount } from "@/types";
import { Form } from "@/components/common/form";
import { localizePrice } from "@/lib/localize-price";
import React from "react";
import { useRouteModal } from "@/components/modals/route-modal-provider";

type Props = {
  account: AdminCashbackAccount;
};

export const CashbackAccountAdjustmentForm = ({ account }: Props) => {
  const { t, i18n } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm<CashbackAccountAdjustmentSchema>({
    defaultValues: {
      amount: 0,
    },
    resolver: zodResolver(CashbackAccountAdjustmentSchema),
  });

  const { amount } = useWatch({ control: form.control });

  const total = React.useMemo(
    () =>
      localizePrice(i18n.language, {
        amount: account.balance + Number(amount || 0),
        currency_code: account.currency_code,
      }),
    [i18n, account, amount],
  );

  const { mutateAsync, isPending } = useAdjustmentCashbackAccount(account.id);

  const handleSubmit = form.handleSubmit(async (payload) => {
    mutateAsync(
      { amount: Number(payload.amount) },
      {
        onSuccess: () => {
          toast.success(t("cashback-accounts.adjustment.successToast"));
          handleSuccess();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  });

  return (
    <RouteDrawer.Form form={form}>
      <KeyboundForm onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <RouteDrawer.Body>
          <div className="flex flex-col gap-y-4">
            <Container className="divide-y">
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {t("cashback-accounts.adjustment.result")}:
                </span>
                <span className="font-medium text-sm">{total}</span>
              </div>
            </Container>
            <Form.Field
              control={form.control}
              name="amount"
              render={({ field }) => {
                return (
                  <Form.Item>
                    <Form.Label>{t("fields.amount")}</Form.Label>
                    <Form.Control>
                      <Input {...field} type="number" inputMode="numeric" />
                    </Form.Control>
                    <Form.ErrorMessage />
                  </Form.Item>
                );
              }}
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
