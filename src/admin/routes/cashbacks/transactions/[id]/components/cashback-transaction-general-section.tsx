import { SectionRow } from "@/components/common/section";
import { localizePrice } from "@/lib/localize-price";
import { AdminCashbackTransaction } from "@/types";
import { Container, Heading, Badge } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const CashbackTransactionGeneralSection = (props: {
    transaction: AdminCashbackTransaction;
}) => {
    const { transaction } = props;
    const { t, i18n } = useTranslation();

    return (
        <Container className="divide-y p-0">
            <div className="flex items-center justify-between px-6 py-4">
                <Heading>{t("cashback-transactions.domain")}</Heading>
                <div className="flex items-center gap-x-4">
                    <Badge>
                        {t(`cashback-transactions.fields.type.${transaction.type}`, transaction.type)}
                    </Badge>
                </div>
            </div>
            <SectionRow title={t("fields.id")} value={transaction.id} />
            <SectionRow
                title={t("cashback-transactions.fields.amount.label")}
                value={localizePrice(i18n.language, {
                    amount: transaction.amount,
                    currency_code: transaction.currency_code,
                })}
            />
            {transaction.account && (
                <SectionRow
                    title={t("cashback-accounts.domain")}
                    value={
                        <Link
                            to={`/admin/cashbacks/accounts/${transaction.account.id}`}
                            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
                        >
                            {transaction.account.customer?.first_name} {transaction.account.customer?.last_name}
                        </Link>
                    }
                />
            )}
            <SectionRow
                title={t("fields.date")}
                value={new Date(transaction.created_at).toLocaleString()}
            />
        </Container>
    );
};
