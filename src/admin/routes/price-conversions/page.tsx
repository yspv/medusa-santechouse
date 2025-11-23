import { Container } from "@medusajs/ui";
import { defineRouteConfig } from "@medusajs/admin-sdk";
import { ArrowPath } from "@medusajs/icons";
import { PriceConversionsListTable } from "./components/price-conversions-list-table/price-conversions-list-table";

const PriceConversionsPage = () => {
  return (
    <Container className="divide-y p-0">
      <PriceConversionsListTable />
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Конвертация цены",
  icon: ArrowPath,
});
export default PriceConversionsPage;
