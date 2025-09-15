"use server";
import { supabaseAdmin } from "@/global/lib/supabaseAdmin";
import { TCategory } from "@/modules/Category/types/category";
// Create category
export async function createCategory(name: string) {
const { data, error } = await supabaseAdmin.from("categories").insert([{ name }]).select().single();
  if (error) throw error;
  return data as TCategory;
}
// Get all categories
export async function getAllCategories(): Promise<TCategory[]> {
  const { data, error } = await supabaseAdmin.from("categories").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as TCategory[];
}

// Get category by ID
export async function getCategoryById(id: string) {
  const { data, error } = await supabaseAdmin.from("categories").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

// Update category
export async function updateCategory(id: string, name: string) {
  const { data, error } = await supabaseAdmin.from("categories").update({ name }).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

// Delete category
export async function deleteCategory(id: string) {
  const { error } = await supabaseAdmin.from("categories").delete().eq("id", id);
  if (error) throw error;
  return { success: true };
}
