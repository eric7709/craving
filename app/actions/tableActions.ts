"use server";
import { supabaseAdmin } from "@/global/lib/supabaseAdmin";
import {
  TCreateTable,
  TUpdateTable,
  TTable,
} from "@/modules/Tables/types/table";
import { camelToSnake } from "@/global/utils/snakeAndCamel";
import { TableDomain } from "@/modules/Tables/services/tableDomain";

// Get all tables
export async function getAllTables(): Promise<TTable[]> {
  const { data, error } = await supabaseAdmin
    .from("tables")
    .select(
      `
      id,
      name,
      table_number,
      capacity,
      is_available,
      url,
      created_at,
      waiter:waiter_id(id, firstname, lastname)
    `
    )
    .order("table_number", { ascending: true });

  if (error) throw error;
  return TableDomain.transformTables(data);
}

// Get table by ID
export async function getTableById(id: string): Promise<TTable | null> {
  const { data, error } = await supabaseAdmin
    .from("tables")
    .select(
      `
      id,
      name,
      table_number,
      capacity,
      is_available,
      url,
      created_at,
      waiter:waiter_id(id, firstname, lastname)
    `
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data ? TableDomain.transformTable(data) : null;
}

// Get table by URL
export async function getTableByUrl(url: string): Promise<TTable | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("tables")
      .select(
        `
        id,
        name,
        table_number,
        capacity,
        is_available,
        url,
        created_at,
        waiter:waiter_id(id, firstname, lastname)
      `
      )
      .eq("url", url)
      .maybeSingle();

    if (error) {
      if (error.code === "PGRST116") {
        // row not found
        return null;
      }
      return null;
    }

    return data ? TableDomain.transformTable(data) : null;
  } catch {
    return null;
  }
}

// Create table
export async function createTable(payload: TCreateTable): Promise<TTable> {
  const { data, error } = await supabaseAdmin
    .from("tables")
    .insert(camelToSnake(payload))
    .select(
      `
      id,
      name,
      table_number,
      capacity,
      is_available,
      url,
      created_at,
      waiter:waiter_id(id, firstname, lastname)
    `
    )
    .single();

  if (error) throw error;
  return TableDomain.transformTable(data);
}

// Update table
export async function updateTable(payload: TUpdateTable): Promise<TTable> {
  const { id, ...rest } = payload;

  const { data, error } = await supabaseAdmin
    .from("tables")
    .update(camelToSnake(rest))
    .eq("id", id)
    .select(
      `
      id,
      name,
      table_number,
      capacity,
      is_available,
      url,
      created_at,
      waiter:waiter_id(id, firstname, lastname)
    `
    )
    .single();

  if (error) throw error;
  return TableDomain.transformTable(data);
}

// Delete table
export async function deleteTable(id: string) {
  const { error } = await supabaseAdmin.from("tables").delete().eq("id", id);
  if (error) throw error;
}

// Allocate waiter
export async function allocateWaiter(
  tableId: string,
  waiterId: string
): Promise<TTable | null> {
  const { error: updateError } = await supabaseAdmin
    .from("tables")
    .update({ waiter_id: waiterId })
    .eq("id", tableId);

  if (updateError) throw updateError;
  return getTableById(tableId);
}

// Deallocate waiter
export async function deallocateWaiter(
  tableId: string
): Promise<TTable | null> {
  const { error: updateError } = await supabaseAdmin
    .from("tables")
    .update({ waiter_id: null })
    .eq("id", tableId);

  if (updateError) throw updateError;
  return getTableById(tableId);
}
