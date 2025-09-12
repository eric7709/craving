"use client";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import Header from "@/modules/Order/components/AdminHeader";
import { TOrder } from "@/modules/Order/types/order";
import {
  Users,
  ShoppingBag,
  Table,
  Utensils,
  DollarSign,
  Layers,
  UserCheck,
  CheckCircle,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import RecentOrders from "./RecentOrders";
import { formatPrice } from "@/global/utils/formatPrice";

// Types
interface DashboardMetrics {
  total_employees: number;
  total_orders_today: number;
  total_tables: number;
  menu_items: number;
  todays_revenue: number;
  total_categories: number;
  total_customers: number;
  completed_orders_today: number;
}
interface CategorySale {
  category_name: string;
  quantity_sold: number;
}
interface DailySale {
  day_name: string;
  day_of_week: number;
  orders_count: number;
}
interface DashboardData {
  metrics: DashboardMetrics;
  category_sales: CategorySale[];
  daily_sales: DailySale[];
}
interface DashboardPageProps {
  data: DashboardData | null;
  loading?: boolean;
  orders: TOrder[];
  error?: string;
}

// Neutral but eye-catching colors
const STAT_COLORS = [
  { bg: "bg-indigo-50", text: "text-indigo-600" },
  { bg: "bg-emerald-50", text: "text-emerald-600" },
  { bg: "bg-sky-50", text: "text-sky-600" },
  { bg: "bg-rose-50", text: "text-rose-600" },
  { bg: "bg-amber-50", text: "text-amber-600" },
  { bg: "bg-purple-50", text: "text-purple-600" },
  { bg: "bg-cyan-50", text: "text-cyan-600" },
  { bg: "bg-teal-50", text: "text-teal-600" },
];

// Chart colors (subtle + consistent)
const CHART_COLORS = [
  "#3b82f6", // blue
  "#10b981", 
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // purple
  "#06b6d4", // cyan
  "#f97316", // orange
  "#14b8a6", // teal
];

// Helpers
const transformDailySalesData = (dailySales: DailySale[]) =>
  dailySales
    .sort((a, b) => a.day_of_week - b.day_of_week)
    .map((sale) => ({
      day: sale.day_name.substring(0, 3),
      orders: sale.orders_count,
    }));

const transformCategorySalesData = (categorySales: CategorySale[]) => {
  return categorySales
    .sort((a, b) => b.quantity_sold - a.quantity_sold) // sort by sold descending
    .slice(0, 5) // only top 5 categories
    .map((category) => ({
      name: category.category_name,
      value: category.quantity_sold,
    }));
};

export default function DashboardPage({
  data,
  loading = false,
  error,
  orders,
}: DashboardPageProps) {
  if (loading)
    return (
      <div className="flex flex-col h-screen bg-slate-50">
        <Header children={<div />} title="Dashboard" />
        <AdminBodyContainer>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard data...</p>
            </div>
          </div>
        </AdminBodyContainer>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col h-screen bg-slate-50">
        <Header children={<div />} title="Dashboard" />
        <AdminBodyContainer>
          <div className="flex flex-col justify-center items-center h-64 text-center">
            <p className="text-red-600 font-semibold mb-1">
              Error loading dashboard
            </p>
            <p className="text-gray-600 text-sm">{error}</p>
          </div>
        </AdminBodyContainer>
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col h-screen bg-slate-50">
        <Header children={<div />} title="Dashboard" />
        <AdminBodyContainer>
          <div className="flex justify-center items-center h-64 text-gray-600">
            No dashboard data available
          </div>
        </AdminBodyContainer>
      </div>
    );

  const metrics = data.metrics;
  const stats = [
    { title: "Employees", value: metrics.total_employees, icon: Users },
    { title: "Orders Today", value: metrics.total_orders_today, icon: ShoppingBag },
    { title: "Tables", value: metrics.total_tables, icon: Table },
    { title: "Menu Items", value: metrics.menu_items, icon: Utensils },
    { title: "Revenue Today", value: formatPrice(metrics.todays_revenue), icon: DollarSign },
    { title: "Categories", value: metrics.total_categories, icon: Layers },
    { title: "Customers", value: metrics.total_customers, icon: UserCheck },
    { title: "Completed Orders", value: metrics.completed_orders_today, icon: CheckCircle },
  ];

  const categorySales = transformCategorySalesData(data.category_sales);
  const dailySalesRanking = transformDailySalesData(data.daily_sales);

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <Header children={<div />} title="Dashboard" />
      <AdminBodyContainer>
        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {stats.map(({ title, value, icon: Icon }, i) => (
            <div
              key={title}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex items-center gap-4 border border-slate-100"
            >
              <div
                className={`p-3 rounded-lg ${STAT_COLORS[i].bg} ${STAT_COLORS[i].text}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-500 truncate">
                  {title}
                </p>
                <p className="text-lg font-bold text-slate-800">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          {/* Pie Chart - Categories */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
            <h2 className="text-sm font-semibold mb-4 text-slate-700">
              Category Sales (Top 5)
            </h2>
            {categorySales.length > 0 ? (
              <>
                <div className="h-52">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={categorySales}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                        paddingAngle={2}
                      >
                        {categorySales.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} sales`, "Category"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {categorySales.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2 text-xs">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                        }}
                      />
                      <span className="text-slate-600">
                        {d.name} ({d.value})
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-48 flex items-center justify-center text-slate-400">
                No category sales data
              </div>
            )}
          </div>

          {/* Bar Chart - Days */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
            <h2 className="text-sm font-semibold mb-4 text-slate-700">
              Daily Orders
            </h2>
            {dailySalesRanking.length > 0 ? (
              <div className="h-52">
                <ResponsiveContainer>
                  <BarChart
                    data={dailySalesRanking}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="day"
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "none",
                        borderRadius: "8px",
                        color: "white",
                        fontSize: "12px",
                      }}
                    />
                    <Bar
                      dataKey="orders"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={45}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-slate-400">
                No daily sales data
              </div>
            )}
          </div>
        </div>
        {/* Recent Orders */}
        <RecentOrders orders={orders} />
      </AdminBodyContainer>
    </div>
  );
}
