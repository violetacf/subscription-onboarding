export function calculateDiscount(monthlyPrice: number, yearPrice: number) {
  const yearPriceWithoutDiscount = monthlyPrice * 12;
  const difference = yearPriceWithoutDiscount - yearPrice;
  return Math.round((difference / yearPriceWithoutDiscount) * 100);
}
