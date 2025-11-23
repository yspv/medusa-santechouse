import { useTranslation } from "react-i18next";

type CurrencyCellProps = {
  currencyCode: string;
};

export const CurrencyCell = ({ currencyCode }: CurrencyCellProps) => {
  return (
    <div className="flex h-full w-full max-w-[250px] items-center gap-x-3 overflow-hidden">
      <span title={currencyCode} className="truncate">
        {currencyCode.toUpperCase()}
      </span>
    </div>
  );
};

export const CurrencyHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span>{t("fields.currency")}</span>
    </div>
  );
};
