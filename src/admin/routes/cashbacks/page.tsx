import { Container } from "@medusajs/ui";
import { defineRouteConfig } from "@medusajs/admin-sdk";
import { CashbackListTable } from "./components/cashback-list-table/cashback-list-table";
import { Cash } from "@medusajs/icons";
import { Outlet } from "react-router-dom";
import React from "react";

const CashbacksListPage = () => {
  return (
    <React.Fragment>
      <Container className="divide-y p-0">
        <CashbackListTable />
      </Container>
      <Outlet />
    </React.Fragment>
  );
};

export const config = defineRouteConfig({
  label: "Кэшбек",
  icon: Cash,
});

export default CashbacksListPage;
