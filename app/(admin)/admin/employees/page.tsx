export const dynamic = 'force-dynamic';

import Base from "@/allPages/admin/employees/Base";
import { getAllEmployees } from "@/app/actions/employeeActions";
import { getAllTables } from "@/app/actions/tableActions";

export default async function page() {
  const employees = await getAllEmployees();
  const tables = await getAllTables();
  return <Base employees={employees} tables={tables} />;
}
