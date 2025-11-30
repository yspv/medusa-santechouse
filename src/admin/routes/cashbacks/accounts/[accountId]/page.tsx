import { useParams } from "react-router-dom";

import { TwoColumnPage } from "@/components/layout/pages";
import { useCashbackAccount } from "@/hooks/api";
import { TwoColumnPageSkeleton } from "@/components/common/skeleton";
import {
  CashbackAccountGeneralSection,
  CashbackAccountListSection,
  CashbackAccountTransactionsSection,
} from "../components/cashback-account-details";
import { CASHBACK_ACCOUNT_FIELDS } from "../constants";

const CashbackAccountDetailsPage = () => {
  const { accountId } = useParams();
  const { cashback_account, isLoading, isError, error } = useCashbackAccount(
    accountId!,
    { fields: CASHBACK_ACCOUNT_FIELDS },
  );
  if (isError) {
    throw error;
  }
  if (isLoading || !cashback_account) {
    return <TwoColumnPageSkeleton />;
  }
  return (
    <TwoColumnPage data={cashback_account} showJSON>
      <TwoColumnPage.Main>
        <CashbackAccountGeneralSection account={cashback_account} />
        <CashbackAccountTransactionsSection account={cashback_account} />
      </TwoColumnPage.Main>
      <TwoColumnPage.Sidebar>
        <CashbackAccountListSection account={cashback_account} />
      </TwoColumnPage.Sidebar>
    </TwoColumnPage>
  );
};
export default CashbackAccountDetailsPage;
