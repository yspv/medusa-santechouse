import { useTranslation } from "react-i18next";

type ToCellProps = {
  to: string;
};

export const ToCell = ({ to }: ToCellProps) => {
  return (
    <div className="text-ui-fg-subtle txt-compact-small flex h-full w-full items-center overflow-hidden">
      <span className="truncate">{to.toUpperCase()}</span>
    </div>
  );
};

export const ToHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span className="truncate">{t("price-conversions.fields.to.label")}</span>
    </div>
  );
};
