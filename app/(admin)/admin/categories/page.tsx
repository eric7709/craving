export const dynamic = 'force-dynamic';

import Base from "@/allPages/admin/categories/Base";
import { getAllCategories } from "@/app/actions/categoryActions";

export default async function page() {
  const categories = await getAllCategories();
  return <Base categories={categories} />;
}
