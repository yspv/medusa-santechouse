import { useTranslation } from "react-i18next";
import { AdminCashbackAmount } from "../../../../../../types";
import { PlaceholderCell } from "../../common/placeholder-cell";
import { Tooltip } from "@medusajs/ui";
import { localizePrice } from "../../../../../lib/localize-price";

type AmountsCellProps = {
  amounts?: AdminCashbackAmount[] | null;
};

export const AmountsCell = ({ amounts }: AmountsCellProps) => {
  const { t, i18n } = useTranslation();

  if (!amounts || !amounts.length) {
    return <PlaceholderCell />;
  }

  if (amounts.length > 1) {
    return (
      <div className="flex h-full w-full items-center gap-x-1 overflow-hidden">
        <span className="truncate">
          {amounts
            .slice(0, 1)
            .map((sc) => sc.currency_code.toUpperCase())
            .join(", ")}
        </span>
        <Tooltip
          content={
            <ul>
              {amounts.slice(1).map((sc) => (
                <li key={sc.id}>{sc.currency_code.toUpperCase()}</li>
              ))}
            </ul>
          }
        >
          <span className="text-xs">
            {t("general.plusCountMore", {
              count: amounts.length - 1,
            })}
          </span>
        </Tooltip>
      </div>
    );
  }

  const amount = amounts[0];

  return (
    <div className="txt-small text-ui-fg-subtle">
      <span>
        {localizePrice(i18n.language, {
          amount: amount.amount,
          currency_code: amount.currency_code,
        })}
      </span>
    </div>
  );
};

export const AmountsHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center justify-end">
      <span className="truncate">{t("cashbacks.fields.amounts.label")}</span>
    </div>
  );
};
