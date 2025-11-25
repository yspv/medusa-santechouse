import { Container } from "@medusajs/ui";
import { BrandListTable } from "./components/brand-list-table";
import { defineRouteConfig } from "@medusajs/admin-sdk";
import { TagSolid } from "@medusajs/icons";
import { Outlet } from "react-router-dom";
import { Fragment } from "react";

const BrandPage = () => {
  return (
    <Fragment>
      <Container className="divide-y p-0">
        <BrandListTable />
      </Container>
      <Outlet />
    </Fragment>
  );
};

export const config = defineRouteConfig({
  label: "Бренды",
  icon: TagSolid,
});

export default BrandPage;
