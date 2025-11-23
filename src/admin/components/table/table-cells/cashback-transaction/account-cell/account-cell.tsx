import { useTranslation } from "react-i18next";
import { AdminCashbackAccount } from "@/types";

type AccountCellProps = {
  account: AdminCashbackAccount;
};

export const AccountCell = ({ account }: AccountCellProps) => {
  const customer = account.customer;
  return (
    <div className="flex h-full w-full max-w-[250px] items-center gap-x-3 overflow-hidden">
      <span title={customer.email} className="truncate">
        {customer.first_name} {customer.last_name}
      </span>
    </div>
  );
};

export const AccountHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span>{t("cashback-transactions.fields.account.label")}</span>
    </div>
  );
};
