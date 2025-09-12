import OrderSearch from "./OrderSearch";
import OrderStatusDropdown from "./StatusDropdown";
import SortOrderDropdown from "./SortOrderDropdown";

export default function CashierOrderHeader() {
  return (
    <div className=" flex gap-4">
      <OrderSearch />
      <OrderStatusDropdown />
      <SortOrderDropdown />
    </div>
  );
}
