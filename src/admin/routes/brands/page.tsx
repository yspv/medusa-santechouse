import { Container } from "@medusajs/ui";
import { BrandListTable } from "./components/brand-list-table";
import { defineRouteConfig } from "@medusajs/admin-sdk";
import { TagSolid } from "@medusajs/icons";

const BrandPage = () => {
  return (
    <Container className="divide-y p-0">
      <BrandListTable />
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Brands",
  icon: TagSolid,
});

export default BrandPage;
