import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCashbackAccount } from "@/hooks/api";
import { CASHBACK_ACCOUNT_FIELDS } from "../../constants";
import { RouteDrawer } from "@/components/modals/route-drawer/route-drawer";
import { CashbackAccountEditForm } from "../../components/cashback-account-edit-form";

const CashbackAccountEditPage = () => {
  const { accountId } = useParams();
  const { t } = useTranslation();
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
          {t("cashback-accounts.edit.header")}
        </RouteDrawer.Title>
        <RouteDrawer.Description className="sr-only" />
      </RouteDrawer.Header>
      {!isLoading && !!cashback_account && (
        <CashbackAccountEditForm account={cashback_account} />
      )}
    </RouteDrawer>
  );
};

export default CashbackAccountEditPage;
