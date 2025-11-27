import { useQueryParams } from "@/hooks/use-query-params";
import { TableQueryProps } from "@/types";

const DEFAULT_FIELDS =
  "+amounts.*,+product_variant.*,+product_variant.product.*";

export const useCashbackTableQuery = ({
  pageSize = 20,
  prefix,
}: TableQueryProps) => {
  const raw = useQueryParams(["offset", "order"], prefix);
  const searchParams = {
    fields: DEFAULT_FIELDS,
    limit: pageSize,
    offset: Number(raw.offset || 0),
    order: raw.order || "-created_at",
  };

  return { searchParams, raw };
};
