import { useTranslation } from "react-i18next";

type NameCellProps = {
  name: string;
};

export const NameCell = ({ name }: NameCellProps) => {
  return (
    <div className="flex w-full h-full items-center overflow-hidden">
      <span className="truncate">{name}</span>
    </div>
  );
};

export const NameHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full items-center">
      <span>{t("fields.title")}</span>
    </div>
  );
};
