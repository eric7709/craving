"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getAllTables,
  getTableById,
  getTableByUrl,
  createTable,
  updateTable,
  deleteTable,
  allocateWaiter,
  deallocateWaiter,
  getAllocationHistory,
} from "@/app/actions/tableActions";

export function useTables() {
  return useQuery({
    queryKey: ["tables"],
    queryFn: getAllTables,
  });
}

// Fetch table by ID
export function useTable(id: string) {
  return useQuery({
    queryKey: ["table", id],
    queryFn: () => getTableById(id),
    enabled: !!id,
  });
}

// Fetch table by URL
export function useTableByUrl(url: string) {
  return useQuery({
    queryKey: ["table-url", url],
    queryFn: () => getTableByUrl(url),
    enabled: !!url,
  });
}

// Create table
export function useCreateTable() {
  return useMutation({
    mutationFn: (payload: any) => createTable(payload),
  });
}

// Update table
export function useUpdateTable() {
  return useMutation({
    mutationFn: (payload: any) => updateTable(payload),
  });
}

// Delete table
export function useDeleteTable() {
  return useMutation({
    mutationFn: (id: string) => deleteTable(id),
  });
}

// Allocate waiter
export function useAllocateWaiter() {
  return useMutation({
    mutationFn: (payload: { tableId: string; waiterId: string }) =>
      allocateWaiter(payload.tableId, payload.waiterId),
  });
}

// Deallocate waiter
export function useDeallocateWaiter() {
  return useMutation({
    mutationFn: (tableId: string) => deallocateWaiter(tableId),
  });
}

// Get allocation history
export function useAllocationHistory(tableId: string) {
  return useQuery({
    queryKey: ["table-allocation-history", tableId],
    queryFn: () => getAllocationHistory(tableId),
    enabled: !!tableId,
  });
}
