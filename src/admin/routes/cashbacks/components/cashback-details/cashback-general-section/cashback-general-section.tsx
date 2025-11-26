import { Container, Heading, StatusBadge } from "@medusajs/ui";
import { AdminCashback } from "@/types";
import { useTranslation } from "react-i18next";
import { getIsActiveProps } from "@/lib/get-status-props";
import { SectionRow } from "@/components/common/section";
import { useDate } from "@/hooks/use-date";
import { ActionMenu } from "@/components/common/action-menu";
import { PencilSquare } from "@medusajs/icons";

export const CashbackGeneralSection = (props: { cashback: AdminCashback }) => {
  const { cashback } = props;
  const { product_variant: variant } = cashback;
  const { t } = useTranslation();
  const { getFullDate } = useDate();
  const activeProps = getIsActiveProps(cashback.is_active, t);
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-6">
        <Heading level="h2">
          {cashback.product_variant?.sku} / {t("fields.details")}
        </Heading>
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <StatusBadge color={activeProps.color}>
              {activeProps.label}
            </StatusBadge>
          </div>
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
      <SectionRow title={t("fields.sku")} value={variant?.sku} />
      <SectionRow
        title={t("fields.createdAt")}
        value={getFullDate({ date: cashback.created_at })}
      />
    </Container>
  );
};
