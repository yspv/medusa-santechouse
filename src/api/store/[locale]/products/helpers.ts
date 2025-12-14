import { Product } from ".medusa/types/query-entry-points";
import { StoreLocaleProduct } from "@/types";

const isPayloadProduct = (fieldName: string) =>
  fieldName.startsWith("payload_product.");

export const remapKeysForPayloadProduct = (selectFields: string[]) => {
  const payloadFields = selectFields.filter(isPayloadProduct);
  return payloadFields.map((field) => field.split(".")[1]);
};
