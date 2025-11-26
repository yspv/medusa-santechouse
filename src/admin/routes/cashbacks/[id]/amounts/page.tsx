import { RouteFocusModal } from "@/components/modals/route-focus-modal";
import { useCashback } from "@/hooks/api";
import { useParams } from "react-router-dom";
import { CashbackAmountsEditForm } from "../../components/cashback-amounts-edit-form";
import { CASHBACK_DETAILS_FIELDS } from "../../constants";

const CashbackAmountsPage = () => {
  const { id } = useParams();
  const { cashback, isLoading, isError, error } = useCashback(id as string, {
    fields: CASHBACK_DETAILS_FIELDS,
  });
  if (isError) {
    throw error;
  }
  return (
    <RouteFocusModal>
      {!isLoading && cashback && (
        <CashbackAmountsEditForm cashback={cashback} />
      )}
    </RouteFocusModal>
  );
};
export default CashbackAmountsPage;
