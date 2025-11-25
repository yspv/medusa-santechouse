import { useParams } from "react-router-dom";
import { Heading } from "@medusajs/ui";
import { useBrand } from "../../../../hooks/api";
import { RouteDrawer } from "../../../../components/modals/route-drawer/route-drawer";
import { BrandEditForm } from "../../components/brand-edit-form/brand-edit-form";
import { useTranslation } from "react-i18next";

const BrandEdit = () => {
  const { t } = useTranslation();
  const { brandId } = useParams();
  const { brand, isPending, isError, error } = useBrand(brandId!, undefined, {
    enabled: !!brandId,
  });
  const ready = !isPending && !!brand;

  if (isError) {
    throw error;
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <RouteDrawer.Title asChild>
          <Heading>{t("brands.edit.header")}</Heading>
        </RouteDrawer.Title>
        <RouteDrawer.Description className="sr-only"></RouteDrawer.Description>
      </RouteDrawer.Header>
      {ready && <BrandEditForm brand={brand} />}
    </RouteDrawer>
  );
};
export default BrandEdit;
