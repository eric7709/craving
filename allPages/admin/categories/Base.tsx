"use client";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import CategoryHeader from "@/modules/Category/components/CategoryHeader";
import CategoryList from "@/modules/Category/components/CategoryList";
import DeleteCategoryModal from "@/modules/Category/components/DeleteCategoryModal";
import { useLoadCategories } from "@/modules/Category/hooks/useLoadCategories";
import { TCategory } from "@/modules/Category/types/category";
import Header from "@/modules/Order/components/AdminHeader";

type Props = {
  categories: TCategory[];
};
export default function Base({ categories }: Props) {
  useLoadCategories(categories);
  return (
    <div className="flex flex-col h-screen">
      <Header children={<CategoryHeader />} title="Categories" />
      <AdminBodyContainer>
        <CategoryList />
        <DeleteCategoryModal />
      </AdminBodyContainer>
    </div>
  );
}
