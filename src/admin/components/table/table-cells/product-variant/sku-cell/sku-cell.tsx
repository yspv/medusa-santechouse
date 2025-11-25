import { useTranslation } from "react-i18next";
import { PlaceholderCell } from "../../common/placeholder-cell";

type SkuCellProps = {
  sku: string | null;
};

export const SkuCell = ({ sku }: SkuCellProps) => {
  if (!sku) return <PlaceholderCell />;
  return (
    <div className="flex h-full w-full items-center overflow-hidden">
      <span className="truncate">{sku}</span>
    </div>
  );
};

export const SkuHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span>{t("fields.sku")}</span>
    </div>
  );
};
