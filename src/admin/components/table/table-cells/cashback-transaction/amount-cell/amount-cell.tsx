import { useTranslation } from "react-i18next";
import { MoneyAmountCell } from "../../common/money-amount-cell";

type AmountCellProps = {
  amount: number;
  currencyCode: string;
};

export const AmountCell = ({ amount, currencyCode }: AmountCellProps) => {
  return <MoneyAmountCell amount={amount} currencyCode={currencyCode} />;
};

export const AmountHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span>{t("cashback-transactions.fields.amount.label")}</span>
    </div>
  );
};
