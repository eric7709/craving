"use client";
import React from "react";
import Link from "next/link";
import { TEmployee } from "../types/employee";
import { User, Mail, Phone, Trash2, Loader2 } from "lucide-react";
import { useEmployeeUtilStore } from "../store/useEmployeeUtilStore";
import { useDeleteEmployee } from "../hooks/useEmployeeServices";
import { useTableDataStore } from "@/modules/Tables/store/useTableDataStore";

export default function EmployeeCard(employee: TEmployee) {
  const { openUpdateModal, openDeleteModal, setSelectedEmployee } =
    useEmployeeUtilStore();
  const { isPending } = useDeleteEmployee();

  const { allTables } = useTableDataStore();

  const assignedTables = allTables
    .filter((el) => el.waiter.id == employee.id)
    .map((el) => el.tableNumber);

  const handleCardClick = () => {
    setSelectedEmployee(employee);
    openUpdateModal();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEmployee(employee);
    openDeleteModal();
  };

  const stopClickPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      onClick={handleCardClick}
      className="relative flex flex-col items-center text-center h-52 p-4 rounded-xl border border-gray-200 bg-slate-900 text-white shadow-sm hover:shadow-md transition cursor-pointer"
    >
      {/* Delete button */}
      <button
        onClick={handleDeleteClick}
        disabled={isPending}
        className="absolute top-2 right-2 p-2 duration-300 cursor-pointer active:scale-90 rounded-full text-white hover:text-red-500 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <Loader2 className="w-3 h-3 animate-spin text-red-500" />
        ) : (
          <Trash2 size={14} />
        )}
      </button>
      {/* Avatar */}
      <div className="flex items-center justify-center h-10 w-10 shrink-0 rounded-full bg-gradient-to-tr from-emerald-500 to-green-700 text-white mb-3">
        <User size={20} />
      </div>
      {/* Name + Role */}
      <h3 className="text-sm font-semibold text-white">
        {employee.firstname} {employee.lastname}
      </h3>
      <span className="mt-1 mb-2 px-2 py-0.5 text-[11px] font-medium rounded-full text-emerald-200 capitalize">
        {employee.role}
      </span>

      {/* Contact */}
      <div className="flex flex-col gap-2 text-xs text-blue-200">
        <Link
          href={`mailto:${employee.email}`}
          onClick={stopClickPropagation}
          className="flex items-center justify-center gap-1 hover:text-emerald-600 transition"
        >
          <Mail size={12} /> {employee.email}
        </Link>

        {employee.phoneNumber && (
          <Link
            href={`tel:${employee.phoneNumber}`}
            onClick={stopClickPropagation}
            className="flex items-center justify-center gap-1 hover:text-emerald-600 transition"
          >
            <Phone size={12} /> {employee.phoneNumber}
          </Link>
        )}
        <div className="flex gap-2 justify-center">
          {assignedTables.map((tableNumber) => (
            <div className="h-6 w-6 border-2 border-green-500 rounded-full grid place-content-center">
              <p>{tableNumber}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
