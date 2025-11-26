import { useCashback } from "@/hooks/api";
import { useParams } from "react-router-dom";
import { TwoColumnPage } from "@/components/layout/pages";
import { TwoColumnPageSkeleton } from "@/components/common/skeleton";
import {
  CashbackGeneralSection,
  CashbackAmountsSection,
} from "../components/cashback-details";
import { CASHBACK_DETAILS_FIELDS } from "../constants";

const CashbackDetailsPage = () => {
  const { id } = useParams();
  const { cashback, isLoading, isError, error } = useCashback(id as string, {
    fields: CASHBACK_DETAILS_FIELDS,
  });
  if (isError) {
    throw error;
  }
  if (isLoading || !cashback) {
    return <TwoColumnPageSkeleton mainSections={1} showJSON />;
  }
  return (
    <TwoColumnPage isLoading={isLoading} data={cashback} showJSON>
      <TwoColumnPage.Main>
        <CashbackGeneralSection cashback={cashback} />
      </TwoColumnPage.Main>
      <TwoColumnPage.Sidebar>
        <CashbackAmountsSection amounts={cashback.amounts || []} />
      </TwoColumnPage.Sidebar>
    </TwoColumnPage>
  );
};

export default CashbackDetailsPage;
