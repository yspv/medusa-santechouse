import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RouteDrawer } from "@/components/modals/route-drawer/route-drawer";
import { CashbackAccountAdjustmentForm } from "../../components/cashback-account-adjustment-form";
import { useCashbackAccount } from "@/hooks/api";
import { CASHBACK_ACCOUNT_FIELDS } from "../../constants";

const CashbackAccountAdjustmentPage = () => {
  const { t } = useTranslation();
  const { accountId } = useParams();
  const { cashback_account, isLoading, isError, error } = useCashbackAccount(
    accountId as string,
    {
      fields: CASHBACK_ACCOUNT_FIELDS,
    },
  );
  if (isError) {
    throw error;
  }
  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <RouteDrawer.Title>
          {t("cashback-accounts.adjustment.header")}
        </RouteDrawer.Title>
        <RouteDrawer.Description />
      </RouteDrawer.Header>
      {!isLoading && !!cashback_account && (
        <CashbackAccountAdjustmentForm account={cashback_account} />
      )}
    </RouteDrawer>
  );
};

export default CashbackAccountAdjustmentPage;
