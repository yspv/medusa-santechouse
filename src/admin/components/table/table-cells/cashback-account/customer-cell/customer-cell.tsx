import { useTranslation } from "react-i18next";
import { AdminCustomer } from "@medusajs/framework/types";

type CustomerCellProps = {
  customer: AdminCustomer;
};

export const CustomerCell = ({ customer }: CustomerCellProps) => {
  return (
    <div className="flex h-full w-full max-w-[250px] items-center gap-x-3 overflow-hidden">
      <span title={customer.email} className="truncate">
        {customer.first_name} {customer.last_name}
      </span>
    </div>
  );
};

export const CustomerHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span>{t("fields.customer")}</span>
    </div>
  );
};
