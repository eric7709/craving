"use client";
import AllocateWaiter from "@/modules/Tables/components/AllocateWaiter";
import CreateTableModal from "@/modules/Tables/components/CreateTableModal";
import DelallocateWaiter from "@/modules/Tables/components/DeallocateWaiter";
import DeleteTableModal from "@/modules/Tables/components/DeleteTableModal";
import TableQRCodeModal from "@/modules/Tables/components/TableQRCodeModal";
import TableList from "@/modules/Tables/components/TableList";
import UpdateTableModal from "@/modules/Tables/components/UpdateTableModal";
import { TTable } from "@/modules/Tables/types/table";
import { TEmployee } from "@/modules/Employees/types/employee";
import Header from "@/modules/Order/components/AdminHeader";
import TableHeader from "@/modules/Tables/components/TableHeader";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import { useLoadTables } from "@/modules/Tables/hooks/useLoadTables";
import { useLoadEmployees } from "@/modules/Employees/hooks/useLoadEmployees";

type Props = {
  tables: TTable[];
  employees: TEmployee[];
};

export default function Base({ employees, tables }: Props) {
  useLoadTables(tables);
  useLoadEmployees(employees);
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
