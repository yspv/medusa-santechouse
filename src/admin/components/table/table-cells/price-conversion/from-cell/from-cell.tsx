import { useTranslation } from "react-i18next";
type FromCellProps = {
  from: string;
};

export const FromCell = ({ from }: FromCellProps) => {
  return (
    <div className="text-ui-fg-subtle txt-compact-small flex h-full w-full items-center overflow-hidden">
      <span className="truncate">{from.toUpperCase()}</span>
    </div>
  );
};

export const FromHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span className="truncate">
        {t("price-conversions.fields.from.label")}
      </span>
    </div>
  );
};
