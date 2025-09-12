export function generateOrderNumber(): string {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, ""); // 20250908
  const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit random
  return `ORD-${dateStr}-${randomNum}`;
}