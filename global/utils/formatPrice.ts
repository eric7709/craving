export function formatPrice(
  amount: number | string,
  hideCurrency?: boolean,
  currency: string = "₦",
): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(value)) return `${currency}0.00`;
  if(hideCurrency) return `${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `${currency}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
