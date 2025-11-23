import { useTranslation } from "react-i18next";
import { Code, Copy } from "@medusajs/ui";
import { PlaceholderCell } from "../../common/placeholder-cell";

type ReferenceCellProps = {
  reference_id?: string | null;
};

export const ReferenceCell = ({ reference_id }: ReferenceCellProps) => {
  if (!reference_id) {
    return <PlaceholderCell />;
  }
  return (
    <Copy content={reference_id}>
      <Code>{reference_id}</Code>
    </Copy>
  );
};

export const ReferenceHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span>{t("cashback-transactions.fields.reference.label")}</span>
    </div>
  );
};
