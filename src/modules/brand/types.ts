import { InferTypeOf } from "@medusajs/framework/types";
import { Brand } from "./models";

export type Brand = InferTypeOf<typeof Brand>;
