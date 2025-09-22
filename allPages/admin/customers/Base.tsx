"use client";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import CustomerHeader from "@/modules/Customer/components/CustomerHeader";
import CustomerList from "@/modules/Customer/components/CustomerList";
import { TCustomer } from "@/modules/Customer/types/customer";
import AdminHeader from "@/modules/Order/components/AdminHeader";
import { useLoadCustomers } from "@/modules/Customer/hooks/useLoadCustomers";

type Props = {
  customers: TCustomer[];
};

export default function Base({ customers }: Props) {
  useLoadCustomers();
  return (
    <div className="h-screen flex-col flex">
      <AdminHeader
        children={<CustomerHeader />}
        title={`Customers (${customers.length})`}
      />
      <AdminBodyContainer>
        <CustomerList />
      </AdminBodyContainer>
    </div>
  );
}
