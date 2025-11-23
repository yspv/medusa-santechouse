import { useTranslation } from "react-i18next";
import { MoneyAmountCell } from "../../common/money-amount-cell";

type BalanceCellProps = {
  currencyCode: string;
  balance: number;
};
export const BalanceCell = ({ balance, currencyCode }: BalanceCellProps) => {
  return <MoneyAmountCell currencyCode={currencyCode} amount={balance} />;
};

export const BalanceHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full items-center justify-end">
      <span className="truncate">{t("cashback-accounts.fields.balance")}</span>
    </div>
  );
};
