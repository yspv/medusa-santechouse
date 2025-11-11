import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RouteDrawer } from "../../../../components/modals/route-drawer/route-drawer";
import { Form } from "../../../../components/common/form";
import { useComboboxData } from "../../../../hooks/use-combobox-data";
import { sdk } from "../../../../lib/sdk";
import { AdminBrand, AdminBrandListReponse } from "../../../../../types/http";
import { Combobox } from "../../../../components/inputs/combobox/combobox";
import { Button, toast } from "@medusajs/ui";
import { AdminProduct } from "@medusajs/framework/types";
import { ProductBrandSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateProductBrand } from "../../../../hooks/api";
import { useRouteModal } from "../../../../components/modals/route-modal-provider";

type ProductBrandFormProps = {
  product: AdminProduct & { brand?: AdminBrand };
};

export const ProductBrandForm = (props: ProductBrandFormProps) => {
  const { product } = props;
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const brands = useComboboxData({
    queryKey: ["brands"],
    queryFn: (params) =>
      sdk.client.fetch<AdminBrandListReponse>(`/admin/brands`, {
        query: params,
      }),
    getOptions: (data) =>
      data.brands.map((brand) => ({ label: brand.name, value: brand.id })),
  });

  const form = useForm<ProductBrandSchema>({
    defaultValues: {
      brand_id: product.brand?.id || "",
    },
    resolver: zodResolver(ProductBrandSchema),
  });

  const { mutateAsync } = useUpdateProductBrand(product.id);

  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data.brand_id, {
      onSuccess: ({ product }) => {
        toast.success(
          t("products.brand.edit.successToast", { title: product.title }),
        );
        handleSuccess();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  });
  return (
    <RouteDrawer.Form form={form}>
      <form onSubmit={handleSubmit} className="flex h-full flex-col">
        <RouteDrawer.Body>
          <div className="flex h-full flex-col gap-y-4">
            <Form.Field
              control={form.control}
              name="brand_id"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>{t("products.fields.brand.label")}</Form.Label>
                  <Form.Control>
                    <Combobox
                      {...field}
                      options={brands.options}
                      searchValue={brands.searchValue}
                      onSearchValueChange={brands.onSearchValueChange}
                      fetchNextPage={brands.fetchNextPage}
                    />
                  </Form.Control>
                </Form.Item>
              )}
            />
          </div>
        </RouteDrawer.Body>
        <RouteDrawer.Footer>
          <div className="flex items-center justify-end gap-x-2">
            <RouteDrawer.Close asChild>
              <Button size="small" variant="secondary">
                {t("actions.cancel")}
              </Button>
            </RouteDrawer.Close>
            <Button size="small" type="submit">
              {t("actions.save")}
            </Button>
          </div>
        </RouteDrawer.Footer>
      </form>
    </RouteDrawer.Form>
  );
};
