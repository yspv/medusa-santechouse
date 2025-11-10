import { useRouteModal } from "../../../../components/modals/route-modal-provider";
import { useForm } from "react-hook-form";
import { CreateBrandSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RouteDrawer } from "../../../../components/modals/route-drawer/route-drawer";
import { Button, Heading, Input, Text, toast } from "@medusajs/ui";
import { Form } from "../../../../components/common/form";
import { useTranslation } from "react-i18next";
import { SwitchBox } from "../../../../components/common/switch-box";
import { RouteFocusModal } from "../../../../components/modals/route-focus-modal";
import { useCreateBrand } from "../../../../hooks/api/brands";

export const BrandCreateForm = () => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm<CreateBrandSchema>({
    defaultValues: {
      name: "",
      is_active: false,
    },
    resolver: zodResolver(CreateBrandSchema),
  });
  const { mutateAsync, isPending } = useCreateBrand();

  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data, {
      onSuccess: ({ brand }) => {
        toast.success(t("brands.edit.successToast", { name: brand.name }));
        handleSuccess(`/brands/${brand.id}`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  });

  return (
    <RouteFocusModal.Form form={form}>
      <form
        onSubmit={handleSubmit}
        className="flex size-full flex-col overflow-hidden"
      >
        <RouteFocusModal.Header></RouteFocusModal.Header>
        <RouteFocusModal.Body className="flex size-full flex-col overflow-auto">
          <div className="flex flex-col items-center p-16">
            <div className="flex w-full max-w-[720px] flex-col gap-y-8">
              <div>
                <Heading>{t("brands.create.header")}</Heading>
                <Text size="small" className="text-ui-fg-subtle">
                  {t("brands.create.description")}
                </Text>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Form.Field
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <Form.Item>
                      <Form.Label>{t("fields.name")}</Form.Label>
                      <Form.Control>
                        <Input
                          autoComplete="off"
                          {...field}
                          placeholder="Acme"
                        />
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )}
                />
                <SwitchBox
                  control={form.control}
                  name="is_active"
                  label={t("brands.fields.status.label")}
                  description={t("brands.fields.status.hint")}
                />
              </div>
            </div>
          </div>
        </RouteFocusModal.Body>
        <RouteFocusModal.Footer>
          <RouteDrawer.Close>
            <Button size="small" variant="secondary">
              {t("actions.cancel")}
            </Button>
          </RouteDrawer.Close>
          <Button
            size="small"
            variant="primary"
            type="submit"
            isLoading={isPending}
          >
            {t("actions.save")}
          </Button>
        </RouteFocusModal.Footer>
      </form>
    </RouteFocusModal.Form>
  );
};
