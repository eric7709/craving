"use client";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import CategoryHeader from "@/modules/Category/components/CategoryHeader";
import CategoryList from "@/modules/Category/components/CategoryList";
import DeleteCategoryModal from "@/modules/Category/components/DeleteCategoryModal";
import { useCategoryDataStore } from "@/modules/Category/store/useCategoryDataStore";
import { TCategory } from "@/modules/Category/types/category";
import Header from "@/modules/Order/components/AdminHeader";
import React, { useEffect } from "react";

type Props = {
  categories: TCategory[];
};
export default function Base(props: Props) {
  const { categories: data } = props;
  const { setCategories } = useCategoryDataStore();
  useEffect(() => {
    setCategories(data);
  }, []);
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
