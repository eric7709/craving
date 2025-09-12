export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Base from "@/allPages/admin/menu-items/Base";
import { getAllCategories } from "@/app/actions/categoryActions";
import { getAllMenuItems } from "@/app/actions/menuItemActions";

export default async function page() {
  const menuItems = await getAllMenuItems();
  const categories = await getAllCategories()
  return <Base menuItems={menuItems} categories={categories}/>;
}
