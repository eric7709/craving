"use client";
import AllocateWaiter from "@/modules/Tables/components/AllocateWaiter";
import CreateTableModal from "@/modules/Tables/components/CreateTableModal";
import DelallocateWaiter from "@/modules/Tables/components/DeallocateWaiter";
import DeleteTableModal from "@/modules/Tables/components/DeleteTableModal";
import TableQRCodeModal from "@/modules/Tables/components/TableQRCodeModal";
import TableList from "@/modules/Tables/components/TableList";
import UpdateTableModal from "@/modules/Tables/components/UpdateTableModal";
import { useTableDataStore } from "@/modules/Tables/store/useTableDataStore";
import { TTable } from "@/modules/Tables/types/table";
import React, { useEffect } from "react";
import { TEmployee } from "@/modules/Employees/types/employee";
import { useEmployeeDataStore } from "@/modules/Employees/store/useEmployeeDataStore";
import Header from "@/modules/Order/components/AdminHeader";
import TableHeader from "@/modules/Tables/components/TableHeader";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";

type Props = {
  tables: TTable[];
  employees: TEmployee[];
};

export default function Base(props: Props) {
  const { tables, employees } = props;
  const { setTables } = useTableDataStore();
  const { setEmployees } = useEmployeeDataStore();
  useEffect(() => {
    setTables(tables);
    setEmployees(employees);
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <Header children={<TableHeader />} title="Tables and Allocation" />
      <AdminBodyContainer>
        <CreateTableModal />
        <TableList />
        <UpdateTableModal />
        <TableQRCodeModal />
        <DelallocateWaiter />
        <AllocateWaiter />
        <DeleteTableModal />
      </AdminBodyContainer>
    </div>
  );
}
