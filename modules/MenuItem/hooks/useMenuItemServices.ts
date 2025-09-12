"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getUnavailableMenuItems,
  updateMenuAvailability,
  uploadMenuItemImage,
} from "@/app/actions/menuItemActions";
import { TCreateMenuItem, TUpdateMenuItem } from "../types/menuItem";

// Queries
export function useMenuItems() {
  return useQuery({
    queryKey: ["menuItems"],
    queryFn: () => getAllMenuItems(), // <-- must wrap call in a function
  });
}

export function useMenuItem(id: string) {
  return useQuery({
    queryKey: ["menuItem", id],
    queryFn: () => getMenuItemById(id), // <-- pass id properly
    enabled: !!id, // only run if id exists
  });
}

export function useUnavailableMenuItems() {
  return useQuery({
    queryKey: ["unavailableMenuItems"],
    queryFn: () => getUnavailableMenuItems(),
  });
}

// Mutations
export function useCreateMenuItem() {
  return useMutation({
    mutationFn: (payload: TCreateMenuItem) => createMenuItem(payload),
  });
}

export function useUpdateMenuItem() {
  return useMutation({
    mutationFn: (payload: TUpdateMenuItem) => updateMenuItem(payload),
  });
}

export function useDeleteMenuItem() {
  return useMutation({
    mutationFn: (id: string) => deleteMenuItem(id),
  });
}

export function useUpdateMenuAvailability() {
  return useMutation({
    mutationFn: ({ id, isAvailable }: { id: string; isAvailable: boolean }) =>
      updateMenuAvailability(id, isAvailable),
  });
}

export function useUploadMenuItemImage() {
  return useMutation({
    mutationFn: ({ file, folder }: { file: File; folder?: string }) =>
      uploadMenuItemImage(file, folder),
  });
}
