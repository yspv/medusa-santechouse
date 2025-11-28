import { useQueryParams } from "@/hooks/use-query-params";
import { TableQueryProps } from "@/types";

export const useBrandTableQuery = ({
  pageSize = 20,
  prefix,
}: TableQueryProps) => {
  const raw = useQueryParams(["q", "offset", "order"], prefix);
  const { offset, order, q } = raw;
  const searchParams = {
    limit: pageSize,
    offset: offset ? Number(offset) : undefined,
    order: order || "-created_at",
    q: q,
  };

  return { searchParams, raw };
};
