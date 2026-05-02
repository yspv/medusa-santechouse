import { useTranslation } from "react-i18next";
import { Thumbnail } from "../../../../common/thumbnail";

type NameCellProps = {
  name: string;
  thumbnail?: string | null;
};

export const NameCell = ({ name, thumbnail }: NameCellProps) => {
  return (
    <div className="flex w-full h-full max-w-[250px] items-center gap-x-3 overflow-hidden">
      <div className="w-fit flex-shrink-0">
        <Thumbnail src={thumbnail} />
      </div>
      <span title={name} className="truncate">{name}</span>
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
