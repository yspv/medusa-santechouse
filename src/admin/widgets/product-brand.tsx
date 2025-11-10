import { AdminProduct, DetailWidgetProps } from "@medusajs/framework/types";
import { clx, Container, Heading, Text } from "@medusajs/ui";
import { AdminBrand } from "../../types/http";
import { useProduct } from "../hooks/api";
import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { useTranslation } from "react-i18next";
import { ActionMenu } from "../components/common/action-menu";
import { PencilSquare } from "@medusajs/icons";

type AdminProductBrand = AdminProduct & { brand: AdminBrand };

const ProductBrandWidget = (props: DetailWidgetProps<AdminProductBrand>) => {
  const { data } = props;
  const { t } = useTranslation();
  const { product } = useProduct(data.id, { fields: "+brand.*" });
  const brand = (product as AdminProductBrand)?.brand;
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">{t("products.fields.brand.label")}</Heading>
        </div>
        <ActionMenu
          groups={[
            {
              actions: [
                {
                  icon: <PencilSquare />,
                  label: t("actions.edit"),
                  to: "",
                },
              ],
            },
          ]}
        />
      </div>
      <div
        className={clx(
          `text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`,
        )}
      >
        <Text size="small" weight="plus" leading="compact">
          {t("fields.name")}
        </Text>
        <Text
          size="small"
          leading="compact"
          className="whitespace-pre-line text-pretty"
        >
          {brand?.name || "-"}
        </Text>
      </div>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.side.before",
});

export default ProductBrandWidget;
