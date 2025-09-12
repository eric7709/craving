export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Base from "@/allPages/waiter/tables/Base";
import { getAllTables } from "@/app/actions/tableActions";

export default async function page() {
  const tables = await getAllTables();
  return <Base {...{ tables }} />;
}
