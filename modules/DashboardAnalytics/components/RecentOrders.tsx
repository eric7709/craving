import { formatPrice } from '@/global/utils/formatPrice'
import { TOrder } from '@/modules/Order/types/order'
import React from 'react'

type Props = {
    orders: TOrder[]
}

export default function RecentOrders({orders}: Props) {
  return (
    <div>
         <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 p-5">
          <h2 className="text-base font-semibold mb-4 text-slate-800">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="py-2.5 text-xs font-medium uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="py-2.5 text-xs font-medium uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="py-2.5 text-xs font-medium uppercase tracking-wider">
                    Total
                  </th>
                  <th className="py-2.5 text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 last:border-none hover:bg-slate-25 transition-colors"
                  >
                    <td className="py-3 font-mono text-xs text-slate-600">
                      {order?.orderNumber}
                    </td>
                    <td className="py-3 text-sm font-medium text-slate-800 capitalize">
                      {order.customer.name}
                    </td>
                    <td className="py-3 text-sm font-semibold text-slate-800">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex capitalize px-2.5 py-1 text-xs font-medium rounded-full ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : order.status === "new"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}
