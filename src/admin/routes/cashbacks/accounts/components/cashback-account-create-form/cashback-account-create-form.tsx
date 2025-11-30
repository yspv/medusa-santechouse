import { Button, Heading, Select, Text, toast } from "@medusajs/ui";
import { RouteFocusModal } from "@/components/modals/route-focus-modal";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { KeyboundForm } from "@/components/utils/keybound-form";
import { useComboboxData } from "@/hooks/use-combobox-data";
import { sdk } from "@/lib/sdk";
import { Form } from "@/components/common/form";
import { Combobox } from "@/components/inputs/combobox/combobox";
import { CashbackAccountCreateSchema } from "../../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouteModal } from "@/components/modals/route-modal-provider";
import { useCreateCashbackAccount } from "@/hooks/api";
import { AdminCustomer } from "@medusajs/framework/types";
import { AdminCashbackAccount } from "@/types";

type Props = {
  currencies: string[];
};

export const CashbackAccountCreateForm = ({ currencies }: Props) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm<CashbackAccountCreateSchema>({
    resolver: zodResolver(CashbackAccountCreateSchema),
  });
  const { currency_code } = useWatch({ control: form.control });
  const customers = useComboboxData({
    queryKey: [],
    queryFn: (query) =>
      sdk.admin.customer.list({ ...query, fields: "+cashback_accounts.*" }),
    getOptions: ({ customers }) => {
      return customers
        .filter(
          (c: AdminCustomer & { cashback_accounts?: AdminCashbackAccount[] }) =>
            c.cashback_accounts?.some((c) => c.currency_code !== currency_code),
        )
        .map((c) => {
          const name = [c.first_name, c.last_name, `(${c.phone || c.email})`]
            .filter(Boolean)
            .join(" ");
          return {
            label: name,
            value: c.id,
          };
        });
    },
  });
  const { mutateAsync, isPending } = useCreateCashbackAccount();
  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values, {
      onSuccess: ({ cashback_account }) => {
        toast(t("cashback-accounts.create.successToast"));
        handleSuccess(`/cashbacks/accounts/${cashback_account.id}`);
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
          <div className="flex flex-col items-center p-16">
            <div className="flex w-full max-w-[720px] flex-col gap-y-8">
              <div>
                <Heading>{t("cashback-accounts.create.header")}</Heading>
                <Text size="small" className="text-ui-fg-subtle">
                  {t("cashback-accounts.create.description")}
                </Text>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <Form.Field
                  control={form.control}
                  name="currency_code"
                  render={({ field }) => {
                    return (
                      <Form.Item>
                        <Form.Label>{t("fields.currency")}</Form.Label>
                        <Form.Control>
                          <Select {...field} onValueChange={field.onChange}>
                            <Select.Trigger ref={field.ref}>
                              <Select.Value />
                            </Select.Trigger>
                            <Select.Content>
                              {currencies.map((currency) => (
                                <Select.Item key={currency} value={currency}>
                                  {currency.toUpperCase()}
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select>
                        </Form.Control>
                        <Form.ErrorMessage />
                      </Form.Item>
                    );
                  }}
                />
                <Form.Field
                  control={form.control}
                  name="customer_id"
                  render={({ field }) => {
                    return (
                      <Form.Item>
                        <Form.Label>{t("fields.customer")}</Form.Label>
                        <Form.Control>
                          <Combobox {...field} {...customers} />
                        </Form.Control>
                        <Form.ErrorMessage />
                      </Form.Item>
                    );
                  }}
                />
              </div>
            </div>
          </div>
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
