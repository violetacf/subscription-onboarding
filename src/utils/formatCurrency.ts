export function formatCurrency(
  value: number,
  currency: string,
  locale = undefined
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}
