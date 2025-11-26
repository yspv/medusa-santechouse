import { Heading } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { RouteDrawer } from "@/components/modals/route-drawer/route-drawer";
import { useCashback } from "@/hooks/api";
import { CashbackEditForm } from "../../components/cashback-edit-form";
import { CASHBACK_DETAILS_FIELDS } from "../../constants";

const CashbackEditPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { cashback, isLoading, isError, error } = useCashback(id!, {
    fields: CASHBACK_DETAILS_FIELDS,
  });
  if (isError) {
    throw error;
  }
  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <RouteDrawer.Title asChild>
          <Heading>{t("cashbacks.edit.header")}</Heading>
        </RouteDrawer.Title>
        <RouteDrawer.Description className="sr-only"></RouteDrawer.Description>
      </RouteDrawer.Header>
      {!isLoading && cashback && <CashbackEditForm cashback={cashback} />}
    </RouteDrawer>
  );
};

export default CashbackEditPage;
