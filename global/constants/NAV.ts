import {
  Home,
  Users,
  ShoppingBag,
  Utensils,
  LayoutList,
  Table,
  ChartArea,
} from "lucide-react";

export const NAV_ITEMS = [
  { name: "Dashboard", icon: Home, href: "/admin" },
  { name: "Orders", icon: ShoppingBag, href: "/admin/orders" },
  { name: "Employees", icon: Users, href: "/admin/employees" },
  { name: "Tables", icon: Table, href: "/admin/tables" },
  { name: "Menu Items", icon: Utensils, href: "/admin/menu-items" },
  { name: "Categories", icon: LayoutList, href: "/admin/categories" },
  // { name: "Analytics", icon: ChartArea, href: "/admin/analytics" },
];
