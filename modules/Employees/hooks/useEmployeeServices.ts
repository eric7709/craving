"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from "@/app/actions/employeeActions";
import { TCreateEmployee, TEmployee, TUpdateEmployee } from "../types/employee";

// Queries
export function useEmployees() {
  return useQuery<TEmployee[]>({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });
}

export function useEmployee(id: string) {
  return useQuery<TEmployee | null>({
    queryKey: ["employee", id],
    queryFn: () => getEmployeeById(id),
    enabled: !!id,
  });
}

export function useCreateEmployee() {
  return useMutation<TEmployee, Error, TCreateEmployee>({
    mutationFn: (payload) => createEmployee(payload),
  });
}

export function useDeleteEmployee() {
  return useMutation<{ message: string; warning?: string }, Error, string>({
    mutationFn: (id) => deleteEmployee(id),
  });
}

export function useUpdateEmployee() {
  return useMutation({
    mutationFn: (payload: TUpdateEmployee) => updateEmployee(payload),
  });
}
