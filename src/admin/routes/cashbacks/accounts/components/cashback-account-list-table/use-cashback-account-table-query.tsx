import { useQueryParams } from "@/hooks/use-query-params";

export const useCashbackAccountTableQuery = ({
  pageSize = 20,
  prefix,
}: {
  pageSize?: number;
  prefix?: string;
}) => {
  const raw = useQueryParams(["offset", "order"], prefix);
  const searchParams = {
    fields: "customer.*",
    limit: pageSize,
    offset: raw.offset ? Number(raw.offset) : 0,
    order: raw.order,
  };
  return {
    raw,
    searchParams,
  };
};
