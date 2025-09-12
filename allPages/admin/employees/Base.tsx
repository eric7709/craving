"use client";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import DeleteEmployeeModal from "@/modules/Employees/components/DeleteEmployeeModal";
import EmployeeHeader from "@/modules/Employees/components/EmployeeHeader";
import EmployeeList from "@/modules/Employees/components/EmployeeList";
import RegisterEmployeeModal from "@/modules/Employees/components/CreateEmployeeModal";
import { useEmployeeDataStore } from "@/modules/Employees/store/useEmployeeDataStore";
import { TEmployee } from "@/modules/Employees/types/employee";
import UpdateMenuItemModal from "@/modules/MenuItem/components/UpdateMenuItemModal";
import Header from "@/modules/Order/components/AdminHeader";
import React, { useEffect } from "react";
import UpdateEmployeeModal from "@/modules/Employees/components/UpdateEmployeeModal";

type Props = {
  employees: TEmployee[];
};

export default function Base(props: Props) {
  const { employees } = props;
  const { setEmployees } = useEmployeeDataStore();
  useEffect(() => {
    setEmployees(employees);
  }, []);
  return (
    <div className="">
      <Header title="Employees" children={<EmployeeHeader />} />
      <AdminBodyContainer>
        <RegisterEmployeeModal />
        <DeleteEmployeeModal />
        <UpdateEmployeeModal />
        <EmployeeList />
        <UpdateMenuItemModal />
      </AdminBodyContainer>
    </div>
  );
}
