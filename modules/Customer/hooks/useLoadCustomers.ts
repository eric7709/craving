import { useEffect } from "react";
import { useCustomerDataStore } from "../store/useCustomerDataStore";
import { TCustomer } from "../types/customer";

export const useLoadCustomers = (customers: TCustomer[]) => {
  const { setCustomers } = useCustomerDataStore();
  useEffect(() => {
    setCustomers(customers);
  }, [customers]);
};
