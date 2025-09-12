export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Base from "@/allPages/cashier/orders/Base";
import { fetchOrders } from "@/app/actions/orderActions";
import { getAllTables } from "@/app/actions/tableActions";

export default async function page() {
  const orders = await fetchOrders();
  const tables = await getAllTables();
  return <Base {...{ orders, tables }} />;
}
