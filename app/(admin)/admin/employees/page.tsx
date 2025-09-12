export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Base from "@/allPages/admin/employees/Base";
import { getAllEmployees } from "@/app/actions/employeeActions";

export default async function page() {
  const employees = await getAllEmployees();
  return <Base employees={employees} />;
}
