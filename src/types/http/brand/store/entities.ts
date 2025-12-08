import { Brand } from ".medusa/types/query-entry-points";

export interface StoreBrand extends Omit<Brand, "products"> {}
