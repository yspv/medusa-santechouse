import { useTranslation } from "react-i18next";
import { PlaceholderCell } from "../../common/placeholder-cell";

type VariantCellProps = {
  variant: string | null;
};

export const VariantCell = ({ variant }: VariantCellProps) => {
  if (!variant) return <PlaceholderCell />;
  return (
    <div className="flex w-full h-full items-center overflow-hidden">
      <span className="truncate">{variant}</span>
    </div>
  );
};

export const VariantHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span>{t("fields.variant")}</span>
    </div>
  );
};
