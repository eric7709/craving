"use server";

import { supabaseAdmin } from "@/global/lib/supabaseAdmin";
import { TMenuItem, TCreateMenuItem, TUpdateMenuItem } from "@/modules/MenuItem/types/menuItem";
import { MenuItemDomain } from "@/modules/MenuItem/services/menuItemDomain";

// Fetch all menu items
export async function getAllMenuItems(): Promise<TMenuItem[]> {
  const { data, error } = await supabaseAdmin
    .from("menu_items")
    .select(`*, category:categories(id, name)`);
  if (error) throw error;
  return (data || []).map(MenuItemDomain.transformMenuItem);
}

// Fetch single menu item by ID
export async function getMenuItemById(id: string): Promise<TMenuItem | null> {
  const { data, error } = await supabaseAdmin
    .from("menu_items")
    .select(`*, category:categories(id, name)`)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data ? MenuItemDomain.transformMenuItem(data) : null;
}

// Create menu item
export async function createMenuItem(item: TCreateMenuItem): Promise<TMenuItem> {
  const { data, error } = await supabaseAdmin
    .from("menu_items")
    .insert([{
      name: item.name,
      price: item.price,
      description: item.description,
      image_url: item.imageUrl ?? null,
      category_id: item.categoryId,
      is_available: item.isAvailable,
      ingredients: item.ingredients ?? null,
    }])
    .select(`*, category:categories(id, name)`)
    .single();
  if (error) throw error;
  return MenuItemDomain.transformMenuItem(data);
}

// Update menu item
export async function updateMenuItem(item: TUpdateMenuItem): Promise<TMenuItem> {
  const { data, error } = await supabaseAdmin
    .from("menu_items")
    .update({
      name: item.name,
      price: item.price,
      description: item.description,
      image_url: item.imageUrl ?? null,
      category_id: item.categoryId,
      is_available: item.isAvailable,
      ingredients: item.ingredients ?? null,
    })
    .eq("id", item.id)
    .select(`*, category:categories(id, name)`)
    .single();
  if (error) throw error;
  return MenuItemDomain.transformMenuItem(data);
}

// Delete menu item
export async function deleteMenuItem(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from("menu_items")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// Get unavailable menu items
export async function getUnavailableMenuItems(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from("menu_items")
    .select("id")
    .eq("is_available", false);
  if (error) throw error;
  if (!data) return [];
  return data.map(el => el.id) as string[];
}

// Update menu availability
export async function updateMenuAvailability(id: string, isAvailable: boolean): Promise<TMenuItem> {
  const { data, error } = await supabaseAdmin
    .from("menu_items")
    .update({ is_available: isAvailable })
    .eq("id", id)
    .select(`*, category:categories(id, name)`)
    .single();
  if (error) throw error;
  return MenuItemDomain.transformMenuItem(data);
}

// Upload menu item image
export async function uploadMenuItemImage(file: File, folder: string = ""): Promise<string> {
  if (!file) throw new Error("No file provided");
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  const { error } = await supabaseAdmin.storage
    .from("menuitemimages")
    .upload(filePath, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;

  const { data: publicUrlData } = supabaseAdmin.storage
    .from("menuitemimages")
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}
