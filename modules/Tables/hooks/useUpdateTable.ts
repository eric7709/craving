import { TUpdateTable, TTableError } from "../types/table";
import { TableDomain } from "../services/tableDomain";
import { useState, useEffect } from "react";
import { useTableUtilStore } from "../store/useTableUtilStore";
import { useUpdateTable as useUpdateTableAPI } from "./useTableServices";
import { tableErrorInitials, updateTableInitials } from "../form/tables";
import { useTableDataStore } from "../store/useTableDataStore";
import { TForm } from "@/global/types/form";

export const useUpdateTable = () => {
  const { activeModal, closeModal, selectedTable } = useTableUtilStore();
  const [values, setValues] = useState<TUpdateTable>(updateTableInitials);
  const [errors, setErrors] = useState<TTableError>(tableErrorInitials);
  const { mutate, isPending } = useUpdateTableAPI();
  const { updateTable, allTables } = useTableDataStore();
  useEffect(() => {
    if (selectedTable !== null && activeModal === "update") {
      setValues(TableDomain.fillTableFields(selectedTable));
    }
  }, [selectedTable, activeModal]);
  const handleChange = (e: TForm) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const options = [
    { label: "", value: "" },
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, errors, isValid } = TableDomain.validateUpdateTable(
      values,
      allTables
    );
    if (!isValid) {
      setErrors(errors);
      return;
    }
    try {
      mutate(data, {
        onSuccess: (data) => {
          updateTable(data);
          closeModal();
        },
        onError: (err: any) => {
          setErrors({ general: err.message || "Failed to update table" });
        },
      });
    } catch (err: any) {
      setErrors({ general: err.message || "Failed to update table" });
    }
  };
  return {
    handleChange,
    handleSubmit,
    errors,
    closeModal,
    isOpen: activeModal === "update",
    values,
    options,
    loading: isPending,
  };
};
