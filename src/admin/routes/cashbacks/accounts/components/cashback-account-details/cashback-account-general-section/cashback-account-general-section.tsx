import { ActionMenu } from "@/components/common/action-menu";
import { SectionRow } from "@/components/common/section";
import { getIsActiveProps } from "@/lib/get-status-props";
import { localizePrice } from "@/lib/localize-price";
import { AdminCashbackAccount } from "@/types";
import { Container, Heading, StatusBadge } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { PencilSquare } from "@medusajs/icons";

export const CashbackAccountGeneralSection = (props: {
  account: AdminCashbackAccount;
}) => {
  const { account } = props;
  const { t, i18n } = useTranslation();
  const name = `${account.customer.first_name} ${account.customer.last_name}`;
  const activeProps = getIsActiveProps(account.is_active, t);
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading>{name}</Heading>
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
      <SectionRow title={t("fields.phone")} value={account.customer.phone} />
      <SectionRow
        title={t("fields.currency")}
        value={account.currency_code.toUpperCase()}
      />
      <SectionRow
        title={t("cashback-accounts.fields.total_earned")}
        value={localizePrice(i18n.language, {
          amount: account.total_earned,
          currency_code: account.currency_code,
        })}
      />
      <SectionRow
        title={t("cashback-accounts.fields.total_redeemed")}
        value={localizePrice(i18n.language, {
          amount: account.total_redeemed,
          currency_code: account.currency_code,
        })}
      />
      <SectionRow
        title={t("cashback-accounts.fields.balance")}
        value={localizePrice(i18n.language, {
          amount: account.balance,
          currency_code: account.currency_code,
        })}
      />
    </Container>
  );
};
