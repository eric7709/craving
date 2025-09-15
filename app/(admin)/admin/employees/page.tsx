export const dynamic = 'force-dynamic';

import Base from "@/allPages/admin/employees/Base";
import { getAllEmployees } from "@/app/actions/employeeActions";

export default async function page() {
  const employees = await getAllEmployees();
  return <Base employees={employees} />;
}
