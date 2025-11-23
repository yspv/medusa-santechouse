import { useTranslation } from "react-i18next";

type RateCellProps = {
  rate: number;
};

export const RateCell = ({ rate }: RateCellProps) => {
  return (
    <div className="text-ui-fg-subtle txt-compact-small flex h-full w-full items-center overflow-hidden">
      <span>{rate}</span>
    </div>
  );
};

export const RateHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span className="truncate">
        {t("price-conversions.fields.rate.label")}
      </span>
    </div>
  );
};
