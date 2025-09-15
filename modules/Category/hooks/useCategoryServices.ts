"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCategory as createCategoryApi,
  getAllCategories as getAllCategoriesApi,
  getCategoryById as getCategoryByIdApi,
  updateCategory as updateCategoryApi,
  deleteCategory as deleteCategoryApi,
} from "@/app/actions/categoryActions"; // your server functions
import { TCategory } from "../types/category";

// ----- Queries -----
export const useCategories = () => {
  return useQuery<TCategory[], Error>({
    queryKey: ["categories"],
    queryFn: getAllCategoriesApi,
    staleTime: 1000 * 60, // 1 min
  });
};

export const useCategoryById = (id: string) => {
  return useQuery<TCategory, Error>({
    queryKey: ["categories", id],
    queryFn: () => getCategoryByIdApi(id),
    enabled: !!id,
  });
};

// ----- Mutations -----
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => createCategoryApi(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateCategoryApi(id, name),
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategoryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
