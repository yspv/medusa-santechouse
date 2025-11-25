import { useQueryParams } from "@/hooks/use-query-params";

const DEFAULT_FIELDS = "id,sku,title,created_at";

export const useProductVariantTableQuery = ({
  prefix,
  pageSize = 20,
}: {
  prefix?: string;
  pageSize?: number;
}) => {
  const raw = useQueryParams(["q", "order", "offset"], prefix);
  const searchParams = {
    limit: pageSize,
    offset: raw.offset || 0,
    order: raw.order,
    q: raw.q,
    fields: DEFAULT_FIELDS,
  };

  return { searchParams, raw };
};
