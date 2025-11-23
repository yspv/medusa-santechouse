import { getIsActiveProps } from "@/lib/get-status-props";
import { StatusBadge } from "@medusajs/ui";
import { useTranslation } from "react-i18next";

type StatusCellProps = {
  isActive: boolean;
};

export const StatusCell = ({ isActive }: StatusCellProps) => {
  const { t } = useTranslation();
  const { color, label } = getIsActiveProps(isActive, t);
  return <StatusBadge color={color}>{label}</StatusBadge>;
};

export const StatusHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span>{t("fields.status")}</span>
    </div>
  );
};
