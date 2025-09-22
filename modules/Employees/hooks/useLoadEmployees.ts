import { useEffect } from "react";
import { TEmployee } from "../types/employee";
import { useEmployeeDataStore } from "../store/useEmployeeDataStore";

export const useLoadEmployees = (employees: TEmployee[]) => {
  const { setEmployees, employees: data, } = useEmployeeDataStore();
  useEffect(() => {
    setEmployees(employees);
  }, [data]);
};
