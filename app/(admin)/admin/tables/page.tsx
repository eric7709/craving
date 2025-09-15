export const dynamic = 'force-dynamic';

import Base from "@/allPages/admin/tables/Base";
import { getAllEmployees } from "@/app/actions/employeeActions";
import { getAllTables } from "@/app/actions/tableActions";

export default async function page() {
  const tables = await getAllTables();
  const employees = await getAllEmployees();
  return <Base tables={tables} employees={employees} />;
}
