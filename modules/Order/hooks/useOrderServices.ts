"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchOrders,
  fetchLast5Orders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  fetchOrderById,
} from "@/app/actions/orderActions";
import { TOrder, TOrderPayload } from "@/modules/Order/types/order";

// Queries

// Fetch all orders with optional filters
export function useOrders(params?: Parameters<typeof fetchOrders>[0]) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => fetchOrders(params),
  });
}

// Fetch last 5 orders
export function useLast5Orders() {
  return useQuery({
    queryKey: ["last5Orders"],
    queryFn: fetchLast5Orders,
  });
}

// Fetch single order by ID
export function useOrder(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrderById(id),
    enabled: !!id, // only fetch if id exists
  });
}

// Mutations

// Create new order
export function useCreateOrder() {
  return useMutation({
    mutationFn: (order: TOrderPayload) => createOrder(order),
  });
}

// Update order status
export function useUpdateOrderStatus() {
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: TOrder["status"] }) =>
      updateOrderStatus(orderId, status),
  });
}

// Delete order
export function useDeleteOrder() {
  return useMutation({
    mutationFn: (orderId: string) => deleteOrder(orderId),
  });
}
