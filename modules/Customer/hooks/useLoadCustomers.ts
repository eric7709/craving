import { useEffect } from "react";
import { useCustomerDataStore } from "../store/useCustomerDataStore";

export const useLoadCustomers = () => {
  const { fetchCustomers,  } = useCustomerDataStore();
  useEffect(() => {
    fetchCustomers();
  }, []);
};
