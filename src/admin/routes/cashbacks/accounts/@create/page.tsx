import { RouteFocusModal } from "@/components/modals/route-focus-modal";
import { CashbackAccountCreateForm } from "../components/cashback-account-create-form";
import { useStore } from "@/hooks/api";

const CashbackAccountCreatePage = () => {
  const { store, isLoading, isError, error } = useStore();
  if (isError) {
    throw error;
  }
  return (
    <RouteFocusModal>
      {!isLoading && store && (
        <CashbackAccountCreateForm
          currencies={store.supported_currencies.map((c) => c.currency_code)}
        />
      )}
    </RouteFocusModal>
  );
};
export default CashbackAccountCreatePage;
