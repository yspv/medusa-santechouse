import { useQueryParams } from "../../../../hooks/use-query-params";

export const useCashbackTableQuery = ({
  pageSize = 20,
  prefix,
}: {
  pageSize?: number;
  prefix?: string;
}) => {
  const raw = useQueryParams(["offset", "order"], prefix);
  const searchParams = {
    fields: "product_variant.*",
    limit: pageSize,
    offset: raw.offset ? Number(raw.offset) : 0,
    order: raw.order,
  };
  return {
    raw,
    searchParams,
  };
};
