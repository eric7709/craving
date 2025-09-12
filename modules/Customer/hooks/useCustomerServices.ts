// modules/Customer/hooks/useCustomerServices.ts
"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getCustomerById,
  getAllCustomers,
  getOrCreateCustomer,
  updateCustomer,
  deleteCustomer,
  emailExists,
  phoneExists,
} from "@/app/actions/customerActions";
import { TCreateCustomer, TUpdateCustomer } from "../types/customer";

// Fetch all customers
export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });
}

// Fetch customer by ID
export function useCustomer(id: string) {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomerById(id),
    enabled: !!id,
  });
}

// Create or get customer
export function useGetOrCreateCustomer() {
  return useMutation({
    mutationFn: (payload: TCreateCustomer) => getOrCreateCustomer(payload),
  });
}

// Update customer
export function useUpdateCustomer() {
  return useMutation({
    mutationFn: (payload: TUpdateCustomer) => updateCustomer(payload),
  });
}

// Delete customer
export function useDeleteCustomer() {
  return useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
  });
}

// Check if email exists
export function useEmailExists() {
  return useMutation({
    mutationFn: (email: string) => emailExists(email),
  });
}

// Check if phone exists
export function usePhoneExists() {
  return useMutation({
    mutationFn: (phone: string) => phoneExists(phone),
  });
}
