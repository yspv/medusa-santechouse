import { Container } from "@medusajs/ui";
import { defineRouteConfig } from "@medusajs/admin-sdk";
import { CashbackListTable } from "./components/cashback-list-table/cashback-list-table";

const CashbacksListPage = () => {
  return (
    <Container className="divide-y p-0">
      <CashbackListTable />
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Кэшбек",
});

export default CashbacksListPage;
