import { AdminCustomer } from "@medusajs/framework/types";
import { useTranslation } from "react-i18next";
import { PlaceholderCell } from "../../common/placeholder-cell";

type PhoneCellProps = {
  customer: AdminCustomer;
};

export const PhoneCell = ({ customer }: PhoneCellProps) => {
  if (!customer.phone) {
    return <PlaceholderCell />;
  }
  return (
    <div className="flex h-full w-full max-w-[250px] items-center gap-x-3 overflow-hidden">
      <span>{customer.phone}</span>
    </div>
  );
};

export const PhoneHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span>{t("fields.phone")}</span>
    </div>
  );
};
