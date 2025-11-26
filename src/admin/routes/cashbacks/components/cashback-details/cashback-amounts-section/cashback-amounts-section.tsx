import { PencilSquare } from "@medusajs/icons";
import { Container, Heading } from "@medusajs/ui";
import { AdminCashbackAmount } from "@/types";
import { ActionMenu } from "@/components/common/action-menu";
import { useTranslation } from "react-i18next";
import { NoRecords } from "@/components/common/empty-table-content";
import { localizePrice } from "@/lib/localize-price";

export const CashbackAmountsSection = (props: {
  amounts: AdminCashbackAmount[];
}) => {
  const { amounts } = props;
  const { t, i18n } = useTranslation();
  const hasAmounts = !!amounts.length;
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">{t("cashbacks.fields.amounts.label")}</Heading>
        <div className="flex items-center gap-x-4">
          <ActionMenu
            groups={[
              {
                actions: [
                  {
                    label: t("actions.edit"),
                    icon: <PencilSquare />,
                    to: "amounts",
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
      {!hasAmounts && <NoRecords className="h-60" />}
      {hasAmounts &&
        amounts.map((amount) => (
          <div
            key={amount.id}
            className="txt-small text-ui-fg-subtle flex justify-between px-6 py-4"
          >
            <span className="font-medium">
              {amount.currency_code.toUpperCase()}
            </span>
            <span>
              {localizePrice(i18n.language, {
                amount: amount.amount,
                currency_code: amount.currency_code,
              })}
            </span>
          </div>
        ))}
    </Container>
  );
};
