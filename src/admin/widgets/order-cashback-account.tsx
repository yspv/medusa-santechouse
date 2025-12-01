import { defineWidgetConfig } from "@medusajs/admin-sdk";
import {
  Button,
  Container,
  Drawer,
  Heading,
  Input,
  Text,
  toast,
} from "@medusajs/ui";
import { AdminOrder, DetailWidgetProps } from "@medusajs/framework/types";
import { useTranslation } from "react-i18next";
import { SectionRow } from "@/components/common/section";
import { useCashbackAccounts } from "@/hooks/api";
import { AdminCashbackAccount, AdminCashbackAccountParams } from "@/types";
import { localizePrice } from "@/lib/localize-price";
import { ActionMenu } from "@/components/common/action-menu";
import { ArrowPath } from "@medusajs/icons";
import React from "react";
import { getLocaleAmount } from "@/lib/money-amount-helpers";
import { useRedeemCashbackTransaction } from "@/hooks/api/cashback-transactions";

const OrderCashbackAccountWidget = ({
  data,
}: DetailWidgetProps<AdminOrder>) => {
  const { t, i18n } = useTranslation();
  const [openRedeem, setOpenRedeem] = React.useState(false);
  const { cashback_accounts, isLoading } = useCashbackAccounts({
    customer_id: data.customer_id,
    currency_code: data.currency_code,
    is_active: true,
  } as AdminCashbackAccountParams);

  const account = cashback_accounts?.[0];
  const balance = !!account
    ? localizePrice(i18n.language, {
        amount: account.balance,
        currency_code: account.currency_code,
      })
    : undefined;

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading level="h2">{t("fields.cashback_account")}</Heading>
          <ActionMenu
            groups={[
              {
                actions: [
                  {
                    label: t("cashback-accounts.redeem.header"),
                    icon: <ArrowPath />,
                    onClick: () => setOpenRedeem(true),
                  },
                ],
              },
            ]}
          />
        </div>
        <SectionRow
          title={t("fields.balance")}
          value={balance ? `${balance}` : undefined}
        />
      </Container>
      {account && (
        <RedeemCashbackForm
          order={data}
          account={account}
          open={openRedeem}
          setOpen={setOpenRedeem}
        />
      )}
    </>
  );
};

const Cost = ({
  label,
  value,
  secondaryValue,
  tooltip,
}: {
  label: React.ReactNode;
  value: string | number;
  secondaryValue?: string;
  tooltip?: React.ReactNode;
}) => (
  <div className="grid grid-cols-3 items-center">
    <Text size="small" leading="compact">
      {label} {tooltip}
    </Text>
    <div className="text-right">
      <Text size="small" leading="compact">
        {secondaryValue}
      </Text>
    </div>
    <div className="text-right">
      <Text size="small" leading="compact">
        {value}
      </Text>
    </div>
  </div>
);

const RedeemCashbackForm = (props: {
  order: AdminOrder;
  account: AdminCashbackAccount;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const { order, account, open, setOpen } = props;
  const { t } = useTranslation();
  const [amount, setAmount] = React.useState<number>();
  const total = getLocaleAmount(
    order.total - (amount || 0),
    order.currency_code,
  );
  const balance = getLocaleAmount(
    account.balance - (amount || 0),
    account.currency_code,
  );
  const { mutateAsync } = useRedeemCashbackTransaction();
  const handleSubmit = async () => {
    if (!amount) return;
    await mutateAsync(
      { order_id: order.id, amount },
      {
        onSuccess: () => {
          toast.success(t("cashback-accounts.redeem.successToast"));
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <form className="sr-only">
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Heading>{t("cashback-accounts.redeem.header")}</Heading>
            </Drawer.Title>
            <Drawer.Description />
          </Drawer.Header>
          <Drawer.Body>
            <div className="flex flex-col gap-y-4">
              <Container className="text-ui-fg-subtle flex flex-col gap-y-2">
                <Cost label={t("fields.balance")} value={balance} />
                <Cost label={t("fields.total")} value={total} />
              </Container>
              <Input
                value={amount}
                onChange={(e) => {
                  const value = e.target.value;
                  setAmount(value ? Number(value) : undefined);
                }}
                max={account.balance}
                min={1}
                placeholder={t("fields.value")}
                type="number"
                inputMode="numeric"
              />
            </div>
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.Close asChild>
              <Button size="small" variant="secondary">
                {t("actions.close")}
              </Button>
            </Drawer.Close>
            <Button size="small" type="submit" onClick={handleSubmit}>
              {t("actions.confirm")}
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </form>
    </Drawer>
  );
};

export const config = defineWidgetConfig({
  zone: "order.details.side.before",
});

export default OrderCashbackAccountWidget;
