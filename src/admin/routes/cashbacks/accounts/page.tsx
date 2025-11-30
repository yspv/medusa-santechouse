import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Container } from "@medusajs/ui";
import { CashbackAccountListTable } from "./components/cashback-account-list-table";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const CashbackAccountsPage = () => {
  return (
    <Fragment>
      <Container className="divide-y p-0">
        <CashbackAccountListTable />
      </Container>
      <Outlet />
    </Fragment>
  );
};

export const config = defineRouteConfig({
  label: "Аккаунты",
});

export default CashbackAccountsPage;
