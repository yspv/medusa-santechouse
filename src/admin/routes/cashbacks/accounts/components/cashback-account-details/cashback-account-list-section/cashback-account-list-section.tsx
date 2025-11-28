import { Container, Heading, StatusBadge } from "@medusajs/ui";
import { AdminCashbackAccount } from "@/types";
import { useTranslation } from "react-i18next";
import React from "react";
import { getIsActiveProps } from "@/lib/get-status-props";
import { NoRecords } from "@/components/common/empty-table-content";
import { Link } from "react-router-dom";

export const CashbackAccountListSection = (props: {
  account: AdminCashbackAccount;
}) => {
  const { account } = props;
  const { t } = useTranslation();
  const otherAccounts = React.useMemo<AdminCashbackAccount[] | undefined>(
    () =>
      account.customer.cashback_accounts?.filter(
        (a: AdminCashbackAccount) => a.currency_code !== account.currency_code,
      ),
    [account],
  );
  const hasAccounts = !!otherAccounts?.length;
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center px-6 py-4">
        <Heading level="h2">{t("cashback-accounts.domain")}</Heading>
      </div>
      {!hasAccounts && <NoRecords className="h-60" />}
      {otherAccounts?.map((account) => {
        const activeProps = getIsActiveProps(account.is_active, t);
        return (
          <Link
            key={account.id}
            to={`/cashbacks/accounts/${account.id}`}
            className="txt-small text-ui-fg-subtle flex justify-between px-6 py-4"
          >
            <span className="font-medium">
              {account.currency_code.toUpperCase()}
            </span>
            <StatusBadge color={activeProps.color}>
              {activeProps.label}
            </StatusBadge>
          </Link>
        );
      })}
    </Container>
  );
};
