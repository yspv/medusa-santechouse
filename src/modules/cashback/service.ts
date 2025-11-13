import { MedusaService } from "@medusajs/framework/utils";
import { Cashback } from "./models/cashback";
import { CashbackAccount } from "./models/cashback-account";
import { CashbackAmount } from "./models/cashback-amount";
import { CashbackTransaction } from "./models/cashback-transaction";

class CashbackModuleService extends MedusaService({
  Cashback,
  CashbackAmount,
  CashbackAccount,
  CashbackTransaction,
}) {}

export default CashbackModuleService;
