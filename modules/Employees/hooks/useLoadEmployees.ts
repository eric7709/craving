import { useEffect } from "react";
import { TEmployee } from "../types/employee";
import { useEmployeeDataStore } from "../store/useEmployeeDataStore";

export const useLoadEmployees = (employees: TEmployee[]) => {
  const { setEmployees, } = useEmployeeDataStore();
  useEffect(() => {
    setEmployees(employees);
  }, [employees]);
};
