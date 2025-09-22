import { useEffect } from "react";
import { useCustomerDataStore } from "../store/useCustomerDataStore";

export const useLoadCustomers = () => {
  const { fetchCustomers, isLoading, customers } = useCustomerDataStore();
  useEffect(() => {
    fetchCustomers();
  }, [customers, isLoading]);
};
