import { useParams } from "react-router-dom";
import { useCashbackTransaction } from "@/hooks/api/cashback-transactions";
import { Container, Heading, Text } from "@medusajs/ui";
import { SingleColumnPageSkeleton } from "@/components/common/skeleton";
import { SingleColumnPage } from "@/components/layout/pages";
import { defineRouteConfig } from "@medusajs/admin-sdk";
import { CashbackTransactionGeneralSection } from "./components/cashback-transaction-general-section";

const CashbackTransactionDetailsPage = () => {
    const { id } = useParams();
    const { cashback_transaction, isLoading, isError, error } =
        useCashbackTransaction(id!);

    if (isError) {
        throw error;
    }

    if (isLoading || !cashback_transaction) {
        return <SingleColumnPageSkeleton />;
    }

    return (
        <SingleColumnPage showJSON data={cashback_transaction}>
            <CashbackTransactionGeneralSection transaction={cashback_transaction} />
        </SingleColumnPage>
    );
};



export default CashbackTransactionDetailsPage;
