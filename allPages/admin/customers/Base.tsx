"use client";
import { motion } from "framer-motion";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import CustomerHeader from "@/modules/Customer/components/CustomerHeader";
import CustomerList from "@/modules/Customer/components/CustomerList";
import { useCustomerDataStore } from "@/modules/Customer/store/useCustomerDataStore";
import { TCustomer } from "@/modules/Customer/types/customer";
import AdminHeader from "@/modules/Order/components/AdminHeader";
import { useEffect } from "react";

type Props = {
  customers: TCustomer[];
};

export default function Base({ customers }: Props) {
  const { fetchCustomers } = useCustomerDataStore();

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <motion.div
      className="h-screen flex-col flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <AdminHeader
        children={<CustomerHeader />}
        title={`Customers (${customers.length})`}
      />
      <AdminBodyContainer>
        <CustomerList />
      </AdminBodyContainer>
    </motion.div>
  );
}
