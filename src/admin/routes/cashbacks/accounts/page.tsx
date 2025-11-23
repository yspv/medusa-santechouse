import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Container } from "@medusajs/ui";
import { CashbackAccountListTable } from "./components/cashback-account-list-table";

const CashbackAccountsPage = () => {
  return (
    <Container className="divide-y p-0">
      <CashbackAccountListTable />
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Аккаунты",
});

export default CashbackAccountsPage;
