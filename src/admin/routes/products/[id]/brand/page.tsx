import { RouteDrawer } from "../../../../components/modals/route-drawer/route-drawer";
import { useProduct } from "../../../../hooks/api";
import { ProductBrandForm } from "../../components/product-brand-form";
import { Heading } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const ProductBrandPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { product, isLoading, isError, error } = useProduct(id!, {
    fields: "+brand.*",
  });
  const ready = !!product && !isLoading;
  if (isError) {
    throw error;
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <RouteDrawer.Title asChild>
          <Heading>{t("products.brand.edit.header")}</Heading>
        </RouteDrawer.Title>
      </RouteDrawer.Header>
      {ready && <ProductBrandForm product={product} />}
    </RouteDrawer>
  );
};

export default ProductBrandPage;
