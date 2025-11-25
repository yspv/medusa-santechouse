import { PriceConversionCreateForm } from "../components/price-conversion-create-form";
import { RouteDrawer } from "@/components/modals/route-drawer/route-drawer";
import { useStore } from "@/hooks/api";
import { Heading } from "@medusajs/ui";
import { useTranslation } from "react-i18next";

const PriceConversionCreatePage = () => {
  const { t } = useTranslation();
  const { store, isPending, isError, error } = useStore();

  const storeCurrencies = (store?.supported_currencies || []).map(
    (c) => c.currency_code,
  );

  if (isError) {
    throw error;
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <Heading>{t("price-conversions.create.header")}</Heading>
      </RouteDrawer.Header>
      {!isPending && store && (
        <PriceConversionCreateForm currencies={storeCurrencies} />
      )}
    </RouteDrawer>
  );
};

export default PriceConversionCreatePage;
