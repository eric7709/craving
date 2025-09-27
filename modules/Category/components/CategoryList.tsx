"use client";
import CategoryCard from "./CategoryCard";
import { useCategoryDataStore } from "../store/useCategoryDataStore";
import AddCategory from "./AddCategory";
import FadeInContainer from "@/global/components/FadeInContainer";

export default function CategoryList() {
  const { filteredCategories } = useCategoryDataStore();
  const categories = filteredCategories();
  const hasCategories = categories && categories.length > 0;

  return (
    <FadeInContainer>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <AddCategory />

        {hasCategories ? (
          categories.map((category) => (
            <CategoryCard {...category} key={category.id} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-6 text-center text-gray-500">
            <p className="text-lg font-medium">No categories found</p>
            <p className="text-sm">Start by adding a new category above.</p>
          </div>
        )}
      </div>
    </FadeInContainer>
  );
}
