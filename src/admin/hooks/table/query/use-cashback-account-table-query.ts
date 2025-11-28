import { useQueryParams } from "@/hooks/use-query-params";
import { TableQueryProps } from "@/types";

const DEFAULT_FIELDS = "+customer.*";

export const useCashbackAccountTableQuery = ({
  pageSize = 20,
  prefix,
}: TableQueryProps) => {
  const raw = useQueryParams(["offset", "order"], prefix);
  const { offset, order } = raw;
  const searchParams = {
    fields: DEFAULT_FIELDS,
    limit: pageSize,
    offset: offset ? Number(offset) : 0,
    order: order || "-created_at",
  };

  return { searchParams, raw };
};
