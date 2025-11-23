import { useQueryParams } from "@/hooks/use-query-params";

const DEFAULT_FIELDS = "id,from,to,rate,created_at";

export const usePriceConversionTableQuery = ({
  pageSize = 20,
  prefix,
}: {
  pageSize?: number;
  prefix?: string;
}) => {
  const raw = useQueryParams(["offset", "order"], prefix);
  const searchParams = {
    fields: DEFAULT_FIELDS,
    limit: pageSize,
    offset: raw.offset ? Number(raw.offset) : 0,
    order: raw.order || "-created_at",
  };
  return {
    raw,
    searchParams,
  };
};
