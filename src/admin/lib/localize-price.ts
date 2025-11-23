export const localizePrice = (
  language: string,
  data: { amount: number; currency_code: string },
) => {
  const formatter = Intl.NumberFormat(language, {
    style: "currency",
    currency: data.currency_code.toUpperCase(),
  });
  return formatter.format(data.amount);
};
