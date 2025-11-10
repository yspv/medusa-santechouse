import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, toast } from "@medusajs/ui";
import { RouteDrawer } from "../../../../components/modals/route-drawer/route-drawer";
import { Form } from "../../../../components/common/form";
import { SwitchBox } from "../../../../components/common/switch-box";
import { BrandEditSchema } from "./schema";
import { AdminBrand } from "../../../../../types/http";
import { useUpdateBrand } from "../../../../hooks/api";
import { useRouteModal } from "../../../../components/modals/route-modal-provider";
import { useTranslation } from "react-i18next";

type BrandEditFormProps = {
  brand: AdminBrand;
};

export const BrandEditForm = (props: BrandEditFormProps) => {
  const { brand } = props;
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm<BrandEditSchema>({
    defaultValues: {
      name: brand.name,
      is_active: brand.is_active,
    },
    resolver: zodResolver(BrandEditSchema),
  });
  const { mutateAsync, isPending } = useUpdateBrand(brand.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data, {
      onSuccess: ({ brand }) => {
        toast.success(t("brands.edit.successToast", { name: brand.name }));
        handleSuccess();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  });

  return (
    <RouteDrawer.Form form={form}>
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <RouteDrawer.Body>
          <div className="flex flex-col gap-y-4">
            <Form.Field
              control={form.control}
              name="name"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>{t("fields.title")}</Form.Label>
                  <Form.Control>
                    <Input autoComplete="off" {...field} />
                  </Form.Control>
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
        </RouteDrawer.Body>
        <RouteDrawer.Footer>
          <RouteDrawer.Close>
            <Button size="small" variant="secondary">
              {t("actions.cancel")}
            </Button>
          </RouteDrawer.Close>
          <Button size="small" type="submit" isLoading={isPending}>
            {t("actions.save")}
          </Button>
        </RouteDrawer.Footer>
      </form>
    </RouteDrawer.Form>
  );
};
