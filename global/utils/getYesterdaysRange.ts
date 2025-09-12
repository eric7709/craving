export function getYesterdayRange() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0)).toISOString();
  const endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999)).toISOString();

  return { startDate: startOfYesterday, endDate: endOfYesterday };
}