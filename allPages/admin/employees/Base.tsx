"use client";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import DeleteEmployeeModal from "@/modules/Employees/components/DeleteEmployeeModal";
import EmployeeHeader from "@/modules/Employees/components/EmployeeHeader";
import EmployeeList from "@/modules/Employees/components/EmployeeList";
import RegisterEmployeeModal from "@/modules/Employees/components/CreateEmployeeModal";
import { TEmployee } from "@/modules/Employees/types/employee";
import UpdateMenuItemModal from "@/modules/MenuItem/components/UpdateMenuItemModal";
import Header from "@/modules/Order/components/AdminHeader";
import UpdateEmployeeModal from "@/modules/Employees/components/UpdateEmployeeModal";
import { TTable } from "@/modules/Tables/types/table";
import { useLoadEmployees } from "@/modules/Employees/hooks/useLoadEmployees";
import { useLoadTables } from "@/modules/Tables/hooks/useLoadTables";

type Props = {
  employees: TEmployee[];
  tables: TTable[];
};

export default function Base({ employees, tables }: Props) {
  useLoadEmployees(employees);
  useLoadTables(tables);
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
