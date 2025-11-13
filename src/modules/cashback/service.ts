import { MedusaService } from "@medusajs/framework/utils";
import {
  Cashback,
  CashbackAmount,
  CashbackAccount,
  CashbackTransaction,
} from "./models";

class CashbackModuleService extends MedusaService({
  Cashback,
  CashbackAmount,
  CashbackAccount,
  CashbackTransaction,
}) {}

export default CashbackModuleService;
