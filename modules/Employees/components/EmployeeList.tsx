import React from "react";
import { useEmployeeDataStore } from "../store/useEmployeeDataStore";
import EmployeeCard from "./EmployeeCard";
import { AddCard } from "@/global/components/AddCard";
import { useEmployeeUtilStore } from "../store/useEmployeeUtilStore";

export default function EmployeeList() {
  const { filteredEmployees } = useEmployeeDataStore();
  const employees = filteredEmployees()
  const { openCreateModal } = useEmployeeUtilStore();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      <AddCard
        description="Add new employee"
        onClick={openCreateModal}
        title="Add Employee"
      />
      {employees.map((employee) => (
        <EmployeeCard {...employee} key={employee.id} />
      ))}
    </div>
  );
}
