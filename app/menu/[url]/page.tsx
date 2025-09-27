export const dynamic = "force-dynamic";
import Base from "@/allPages/menu/Base";
import { getAllCategories } from "@/app/actions/categoryActions";
import { getAllMenuItems } from "@/app/actions/menuItemActions";
import { getTableByUrl } from "@/app/actions/tableActions";
import { redirect } from "next/navigation";

type PageProps = {
  params: {
    url: string;
  };
};

export default async function Page({ params }: PageProps) {
  const menuItems = await getAllMenuItems();
  const categories = await getAllCategories();
  const table = await getTableByUrl(params.url);
  if (!table) redirect("/no-table-found");
  if (!table?.waiter?.id) redirect("/no-waiter-found");
  if (!table?.isAvailable) redirect("/table-not-available"); // ✅ fixed
  return <Base {...{ menuItems, categories, table }} />;
}
