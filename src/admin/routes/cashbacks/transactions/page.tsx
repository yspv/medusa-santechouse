import { Container } from "@medusajs/ui";
import { CashbackTransactionListTable } from "./componets/cashback-transaction-list-table";
import { defineRouteConfig } from "@medusajs/admin-sdk";

const CashbackTransactionsPage = () => {
  return (
    <Container className="divide-y p-0">
      <CashbackTransactionListTable />
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Транзакции",
});

export default CashbackTransactionsPage;
