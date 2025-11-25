import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePriceConversionSchema } from "./schema";
import { KeyboundForm } from "@/components/utils/keybound-form";
import { Form } from "@/components/common/form";
import { Button, Input, Select, toast, usePrompt } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { RouteDrawer } from "@/components/modals/route-drawer/route-drawer";
import {
  useConfirmPriceConversion,
  useCreatePriceConversion,
} from "@/hooks/api";
import { useRouteModal } from "@/components/modals/route-modal-provider";

export const PriceConversionCreateForm = (props: { currencies: string[] }) => {
  const { currencies } = props;
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const prompt = usePrompt();
  const form = useForm<CreatePriceConversionSchema>({
    defaultValues: {
      from: "",
      to: "",
    },
    resolver: zodResolver(CreatePriceConversionSchema),
  });

  const {
    mutateAsync: createPriceConversion,
    isPending,
    isError,
  } = useCreatePriceConversion();

  const { mutateAsync: confirmPriceConversion } = useConfirmPriceConversion();

  const handleSubmit = form.handleSubmit(async (values) => {
    const { transaction_id } = await createPriceConversion(values, {
      onError: (error) => {
        toast.error(error.message);
      },
    });
    if (isError) return;
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("price-conversions.create.confirmation"),
      confirmText: t("actions.confirm"),
      cancelText: t("actions.cancel"),
    });
    if (!res) return;
    await confirmPriceConversion(transaction_id, {
      onSuccess: () => {
        toast.success(t("price-conversions.create.successToast"));
        handleSuccess();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  });
  return (
    <RouteDrawer.Form form={form}>
      <KeyboundForm
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <RouteDrawer.Body className="overflow-y-auto">
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
              <Form.Field
                control={form.control}
                name="from"
                render={({ field }) => {
                  return (
                    <Form.Item>
                      <Form.Label>
                        {t("price-conversions.fields.from.label")}
                      </Form.Label>
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
                name="to"
                render={({ field }) => {
                  return (
                    <Form.Item>
                      <Form.Label>
                        {t("price-conversions.fields.to.label")}
                      </Form.Label>
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
                name="rate"
                render={({ field }) => {
                  return (
                    <Form.Item>
                      <Form.Label>
                        {t("price-conversions.fields.rate.label")}
                      </Form.Label>
                      <Form.Control>
                        <Input
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? undefined : Number(value),
                            );
                          }}
                          type="number"
                        />
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  );
                }}
              />
            </div>
          </div>
        </RouteDrawer.Body>
        <RouteDrawer.Footer>
          <div className="flex items-center gap-x-2">
            <RouteDrawer.Close asChild>
              <Button size="small" variant="secondary">
                {t("actions.cancel")}
              </Button>
            </RouteDrawer.Close>
            <Button size="small" type="submit" isLoading={isPending}>
              {t("actions.save")}
            </Button>
          </div>
        </RouteDrawer.Footer>
      </KeyboundForm>
    </RouteDrawer.Form>
  );
};
