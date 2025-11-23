import { useTranslation } from "react-i18next";
import { MoneyAmountCell } from "../../common/money-amount-cell";

type TotalRedeemedCellProps = {
  totalRedeemed: number;
  currencyCode: string;
};

export const TotalRedeemedCell = ({
  totalRedeemed,
  currencyCode,
}: TotalRedeemedCellProps) => {
  return <MoneyAmountCell amount={totalRedeemed} currencyCode={currencyCode} />;
};

export const TotalRedeemedHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span>{t("cashback-accounts.fields.total_redeemed")}</span>
    </div>
  );
};
