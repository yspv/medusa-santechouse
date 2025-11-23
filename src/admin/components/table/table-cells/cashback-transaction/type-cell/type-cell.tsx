import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { StatusBadge } from "@medusajs/ui";
import { CashbackTransactionType } from "@/types";

type TypeCellProps = {
  type: CashbackTransactionType;
};

const getTypeStatusProps = (
  type: CashbackTransactionType,
  t: TFunction,
): { color: "green" | "red" | "orange"; label: string } => {
  switch (type) {
    case "earned": {
      return {
        color: "green",
        label: t("cashback-transactions.fields.type.earned"),
      };
    }
    case "redeemed": {
      return {
        color: "red",
        label: t("cashback-transactions.fields.type.redeemed"),
      };
    }
    case "adjustment": {
      return {
        color: "orange",
        label: t("cashback-transactions.fields.type.adjustment"),
      };
    }
  }
};

export const TypeCell = ({ type }: TypeCellProps) => {
  const { t } = useTranslation();
  const { color, label } = getTypeStatusProps(type, t);
  return <StatusBadge color={color}>{label}</StatusBadge>;
};

export const TypeHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span>{t("cashback-transactions.fields.type.label")}</span>
    </div>
  );
};
