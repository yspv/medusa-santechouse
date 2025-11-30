import { DataTable } from "@/components/common/data-table";
import { useCashbackTransactions } from "@/hooks/api/cashback-transactions";
import { useCashbackTransactionTableColumns } from "@/hooks/table/columns";
import { useCashbackTransactionTableQuery } from "@/hooks/table/query";
import { AdminCashbackAccount, AdminCashbackTransactionParams } from "@/types";
import { Container, Heading } from "@medusajs/ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { useCashbackTransactionTableFilters } from "@/hooks/table/filters";

const PAGE_SIZE = 10;
const TRANSACTIONS_PREFIX = "cbat";

export const CashbackAccountTransactionsSection = (props: {
  account: AdminCashbackAccount;
}) => {
  const { account } = props;
  const { t } = useTranslation();
  const columns = useColumns();
  const filters = useFilters();
  const { searchParams } = useCashbackTransactionTableQuery({
    pageSize: PAGE_SIZE,
    prefix: TRANSACTIONS_PREFIX,
  });
  const query = {
    ...searchParams,
    account_id: account.id,
  };
  const { cashback_transactions, count, isLoading } = useCashbackTransactions(
    query as AdminCashbackTransactionParams,
  );
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading>{t("cashback-transactions.domain")}</Heading>
      </div>
      <DataTable
        columns={columns}
        data={cashback_transactions}
        filters={filters}
        prefix={TRANSACTIONS_PREFIX}
        isLoading={isLoading}
        getRowId={(row) => row.id}
        rowCount={count}
        pageSize={PAGE_SIZE}
      />
    </Container>
  );
};

const useColumns = () => {
  const base = useCashbackTransactionTableColumns({ exclude: ["account"] });
  return React.useMemo(() => [...base], [base]);
};

const useFilters = () => {
  const base = useCashbackTransactionTableFilters();
  return React.useMemo(() => [...base], [base]);
};
