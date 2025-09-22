import { useEffect } from "react";
import { useCategoryDataStore } from "../store/useCategoryDataStore";
import { TCategory } from "../types/category";

export const useLoadCategories = (categories: TCategory[]) => {
  const { setCategories } = useCategoryDataStore();
  useEffect(() => {
    setCategories(categories);
  }, [categories]);
};
