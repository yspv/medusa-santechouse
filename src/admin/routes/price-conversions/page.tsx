import { Container } from "@medusajs/ui";
import { defineRouteConfig } from "@medusajs/admin-sdk";
import { ArrowPath } from "@medusajs/icons";
import { PriceConversionsListTable } from "./components/price-conversions-list-table/price-conversions-list-table";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { t } from "i18next";

const PriceConversionsPage = () => {
  return (
    <Fragment>
      <Container className="divide-y p-0">
        <PriceConversionsListTable />
      </Container>
      <Outlet />
    </Fragment>
  );
};

export const config = defineRouteConfig({
  label: "Конвертация цены",
  icon: ArrowPath,
});

export const handle = {
  breadcrumb: () => t("price-conversions.domain"),
};

export default PriceConversionsPage;
