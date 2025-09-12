export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Base from "@/allPages/admin/categories/Base";
import { getAllCategories } from "@/app/actions/categoryActions";

export default async function page() {
  const categories = await getAllCategories();
  return <Base categories={categories} />;
}
