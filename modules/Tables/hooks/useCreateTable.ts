import { useState } from "react";
import { TCreateTable, TTableError } from "../types/table";
import { useTableUtilStore } from "../store/useTableUtilStore";
import { useTableDataStore } from "../store/useTableDataStore";
import { createTableInitials } from "../form/tables";
import { useCreateTable as useCreateTableAPI } from "./useTableServices";
import { TableDomain } from "../services/tableDomain";
import { customerErrorInitials } from "@/modules/Customer/form/customer";
import { TForm } from "@/global/types/form";

export const useCreateTable = () => {
  const [values, setValues] = useState<TCreateTable>(createTableInitials);
  const [errors, setErrors] = useState<TTableError>(customerErrorInitials);
  const { activeModal, closeModal } = useTableUtilStore();
  const { addTable, allTables } = useTableDataStore();
  const { mutate, isPending } = useCreateTableAPI();
  const handleChange = (e: TForm) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name as keyof TTableError]) return prev;
      const next = { ...prev };
      delete next[name as keyof TTableError];
      return next;
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { tableNumber, name } = values;
    const {
      data,
      isValid,
      errors: validationError,
    } = TableDomain.validateNewTable(values, allTables);
    if (!isValid) {
      setErrors(validationError);
      return;
    }
    mutate(data, {
      onSuccess: (data) => {
        addTable(data);
        setValues(createTableInitials);
        setErrors(customerErrorInitials);
        closeModal();
      },
      onError: (err: any) => {
        setErrors({ general: err.message || "Failed to create table" });
      },
    });
  };

  return {
    values,
    errors,
    loading: isPending,
    isOpen: activeModal === "create",
    handleChange,
    handleSubmit,
    closeModal,
  };
};
