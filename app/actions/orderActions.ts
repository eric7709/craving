"use server";
import { supabaseAdmin } from "@/global/lib/supabaseAdmin";
import { OrderDomain } from "@/modules/Order/services/orderDomain";
import {
  TFetchOrdersParams,
  TOrder,
  TOrderPayload,
} from "@/modules/Order/types/order";

export async function fetchOrders(params: TFetchOrdersParams = {}): Promise<TOrder[]> {
  let { startDate, endDate } = params;
  const { status } = params;
  if (!startDate || !endDate) {
    const today = new Date();
    startDate = startDate ?? new Date(today.setHours(0, 0, 0, 0)).toISOString();
    endDate =
      endDate ?? new Date(today.setHours(23, 59, 59, 999)).toISOString();
  }
  let query = supabaseAdmin.from("orders").select(`
    *,
    table:tables(*),
    waiter:employees(*),
    customer:customers(*)
  `);
  if (status) query = query.eq("status", status);
  if (startDate) query = query.gte("created_at", startDate);
  if (endDate) query = query.lte("created_at", endDate);

  const { data, error } = await query;
  if (error) throw error;
  return OrderDomain.transformOrders(data || []);
}

// Fetch last 5 orders
export async function fetchLast5Orders(): Promise<TOrder[]> {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(
      `
      *,
      table:tables(*),
      waiter:employees(*),
      customer:customers(*)
    `
    )
    .order("created_at", { ascending: false })
    .limit(5);
  if (error) throw error;
  return OrderDomain.transformOrders(data || []);
}

// Create order
export async function createOrder(order: TOrderPayload): Promise<TOrder> {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .insert([
      {
        table_id: order.tableId,
        waiter_id: order.waiterId,
        items: order.items,
        total: order.total,
        status: "new",
        customer_id: order.customerId,
        invoice_number: OrderDomain.generateInvoiceNumber(),
        order_number: order.orderNumber,
        payment_method: null,
        created_at: new Date().toISOString(),
      },
    ])
    .select(
      `
      *,
      table:tables(*),
      waiter:employees(*),
      customer:customers(*)
    `
    )
    .single();
  if (error) throw error;
  return OrderDomain.transformOrder(data);
}

// Update order status
export async function updateOrderStatus(
  orderId: string,
  status: TOrder["status"]
): Promise<TOrder> {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .update({ status })
    .eq("id", orderId).select(`
      *,
      table:tables(*),
      waiter:employees(*),
      customer:customers(*)
    `);
  if (error) throw error;
  if (!data || data.length === 0) throw new Error("Order not found");
  return OrderDomain.transformOrder(data[0]);
}

// Delete order
export async function deleteOrder(orderId: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("orders")
    .delete()
    .eq("id", orderId);
  if (error) throw error;
  return true;
}

// Fetch order by ID
export async function fetchOrderById(id: string): Promise<TOrder | null> {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(
      `
      *,
      customer:customers(*),
      table:tables(*),
      waiter:employees(*)
    `
    )
    .eq("id", id)
    .single();
  if (error) return null;
  return data ? OrderDomain.transformOrder(data) : null;
}
