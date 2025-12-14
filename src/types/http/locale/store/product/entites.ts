import { Product } from ".medusa/types/query-entry-points";
import { PayloadCollectionItem } from "@/modules/payload/types";

export interface StoreLocaleProduct extends Product {
  payload_product?: PayloadCollectionItem;
}
