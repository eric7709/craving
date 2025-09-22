import Base from "@/allPages/admin/customers/Base";
import { getAllCustomers } from "@/app/actions/customerActions";

export const dynamic = "force-dynamic";

export default async function page() {
  const customers = await getAllCustomers();
  console.log(customers)
  return <Base customers={customers} />;
}
