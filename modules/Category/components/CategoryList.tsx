"use client";
import CategoryCard from "./CategoryCard";
import { useCategoryDataStore } from "../store/useCategoryDataStore";
import AddCategory from "./AddCategory";
import FadeInContainer from "@/global/components/FadeInContainer";

export default function CategoryList() {
  const { filteredCategories } = useCategoryDataStore();
  const categories = filteredCategories();
  return (
    <FadeInContainer>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <AddCategory />
        {categories?.map((category) => (
          <CategoryCard {...category} key={category.id} />
        ))}
      </div>
    </FadeInContainer>
  );
}
