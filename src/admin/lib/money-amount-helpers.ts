export const getLocaleAmount = (amount: number, currencyCode: string) => {
  const formatter = new Intl.NumberFormat([], {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    currency: currencyCode,
  });

  return formatter.format(amount);
};
