import { localizePrice } from "@/lib/localize-price";
import { useTranslation } from "react-i18next";
import { clx } from "@medusajs/ui";
import { PlaceholderCell } from "../placeholder-cell";

type MoneyAmountCellProps = {
  currencyCode: string;
  amount?: number;
  align?: "left" | "right";
  className?: string;
};

export const MoneyAmountCell = ({
  amount,
  currencyCode,
  align = "left",
  className,
}: MoneyAmountCellProps) => {
  const { i18n } = useTranslation();
  if (typeof amount === "undefined" || amount === null) {
    return <PlaceholderCell />;
  }
  const formatted = localizePrice(i18n.language, {
    amount,
    currency_code: currencyCode,
  });
  return (
    <div
      className={clx(
        "flex h-full w-full items-center overflow-hidden",
        {
          "justify-start text-left": align === "left",
          "justify-end text-right": align === "right",
        },
        className,
      )}
    >
      <span className="truncate">{formatted}</span>
    </div>
  );
};
