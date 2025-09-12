"use server";

import { supabaseAdmin } from "@/global/lib/supabaseAdmin";
import {
  TCreateTable,
  TUpdateTable,
  TTable,
} from "@/modules/Tables/types/table";
import { camelToSnake, snakeToCamel } from "@/global/utils/snakeAndCamel";
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
    // new
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
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // row not found
        return null;
      }
      console.error("Supabase error fetching table:", error);
      return null;
    }

    return data ? TableDomain.transformTable(data) : null;
  } catch (err) {
    console.error("Unexpected error fetching table:", err);
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

  const { error: historyError } = await supabaseAdmin
    .from("table_allocation_history")
    .insert(
      camelToSnake({ tableId, waiterId, allocatedAt: new Date().toISOString() })
    );
  if (historyError) throw historyError;

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

  const { error: historyError } = await supabaseAdmin
    .from("table_allocation_history")
    .insert(
      camelToSnake({
        tableId,
        waiterId: null,
        deallocatedAt: new Date().toISOString(),
      })
    );
  if (historyError) throw historyError;

  return getTableById(tableId);
}

// Allocation history
export async function getAllocationHistory(tableId: string) {
  const { data, error } = await supabaseAdmin
    .from("table_allocation_history")
    .select(
      `
      id,
      table_id,
      waiter_id,
      allocated_at,
      deallocated_at,
      waiter:waiter_id(id, firstname, lastname)
    `
    )
    .eq("table_id", tableId)
    .order("allocated_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(snakeToCamel);
}
