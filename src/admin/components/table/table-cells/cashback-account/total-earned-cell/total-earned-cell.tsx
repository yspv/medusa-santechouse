import { useTranslation } from "react-i18next";
import { MoneyAmountCell } from "../../common/money-amount-cell";

type TotalEarnedCellProps = {
  totalEarned: number;
  currencyCode: string;
};

export const TotalEarnedCell = ({
  totalEarned,
  currencyCode,
}: TotalEarnedCellProps) => {
  return <MoneyAmountCell amount={totalEarned} currencyCode={currencyCode} />;
};

export const TotalEarnedHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span>{t("cashback-accounts.fields.total_earned")}</span>
    </div>
  );
};
