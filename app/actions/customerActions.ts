// app/actions/customers.ts
"use server";

import { supabaseAdmin } from "@/global/lib/supabaseAdmin";
import { TCreateCustomer, TUpdateCustomer, TCustomer } from "@/modules/Customer/types/customer";
import { camelToSnake, snakeToCamel } from "@/global/utils/snakeAndCamel";

// Get customer by ID
export async function getCustomerById(id: string): Promise<TCustomer | null> {
  const { data, error } = await supabaseAdmin.from("customers").select("*").eq("id", id).single();
  if (error) throw error;
  return snakeToCamel(data) as TCustomer;
}

// Get all customers
export async function getAllCustomers(): Promise<TCustomer[]> {
  const { data, error } = await supabaseAdmin.from("customers").select("*").order("created_at", { ascending: true });
  if (error) throw error;
  return (data || []).map(snakeToCamel) as TCustomer[];
}

// Get or create customer
export async function getOrCreateCustomer(customer: TCreateCustomer): Promise<TCustomer> {
  const { data: existing, error: fetchError } = await supabaseAdmin
    .from("customers")
    .select("*")
    .eq("email", customer.email)
    .maybeSingle();
  if (fetchError) throw fetchError;
  if (existing) return snakeToCamel(existing) as TCustomer;

  const { data: newCustomer, error: insertError } = await supabaseAdmin
    .from("customers")
    .insert(camelToSnake(customer))
    .select("*")
    .single();
  if (insertError) throw insertError;

  return snakeToCamel(newCustomer) as TCustomer;
}

// Update customer
export async function updateCustomer(customer: TUpdateCustomer): Promise<TCustomer> {
  const { id, ...rest } = customer;
  const { data, error } = await supabaseAdmin
    .from("customers")
    .update(camelToSnake(rest))
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return snakeToCamel(data) as TCustomer;
}

// Delete customer
export async function deleteCustomer(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from("customers").delete().eq("id", id);
  if (error) throw error;
}

// Email exists
export async function emailExists(email: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin.from("customers").select("id").eq("email", email).maybeSingle();
  if (error) throw error;
  return !!data;
}

// Phone exists
export async function phoneExists(phone: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin.from("customers").select("id").eq("phone_number", phone).maybeSingle();
  if (error) throw error;
  return !!data;
}
