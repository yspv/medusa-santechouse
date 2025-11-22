import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Container, Heading, StatusBadge } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { useProductVariant } from "../hooks/api";
import {
  DetailWidgetProps,
  AdminProductVariant,
} from "@medusajs/framework/types";
import { AdminCashback } from "../../types/http";
import { NoRecords } from "../components/common/empty-table-content";
import { ActionMenu } from "../components/common/action-menu";
import { PencilSquare } from "@medusajs/icons";

type AdminProductVariantCashback = AdminProductVariant & {
  cashback: AdminCashback;
};

const ProductVariantCashbackWidget = (
  props: DetailWidgetProps<AdminProductVariantCashback>,
) => {
  const { data } = props;
  const { t, i18n } = useTranslation();
  const { variant, isLoading } = useProductVariant(data.product_id!, data.id, {
    fields: "+cashback.*,+cashback.amounts.*",
  });
  const cashback = (variant as AdminProductVariantCashback)?.cashback;
  const hasAmounts = !!cashback?.amounts?.length;

  const getLocalePrice = (amount: number, currency: string) => {
    const formatter = Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency: currency.toUpperCase(),
    });
    return formatter.format(amount);
  };

  if (isLoading) return <></>;
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">{t("products.variant.cashback.header")}</Heading>
        <div className="flex items-center gap-x-4">
          {!!cashback && (
            <div className="flex items-center gap-x-2">
              <StatusBadge color={cashback.is_active ? "green" : "red"}>
                {t(`statuses.${cashback.is_active ? "active" : "inactive"}`)}
              </StatusBadge>
            </div>
          )}
          <ActionMenu
            groups={[
              {
                actions: [
                  {
                    label: t("actions.edit"),
                    icon: <PencilSquare />,
                    to: "edit",
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
      {!hasAmounts && <NoRecords className="h-60" />}
      {hasAmounts &&
        cashback.amounts?.map((amount) => (
          <div
            key={amount.id}
            className="txt-small text-ui-fg-subtle flex justify-between px-6 py-4"
          >
            <span className="font-medium">
              {amount.currency_code.toUpperCase()}
            </span>
            <span>{getLocalePrice(amount.amount, amount.currency_code)}</span>
          </div>
        ))}
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product_variant.details.side.after",
});

export default ProductVariantCashbackWidget;
