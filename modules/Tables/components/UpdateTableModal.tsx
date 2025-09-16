import React from "react";
import Modal from "@/global/components/Modal";
import { Field } from "@/global/components/Field";
import { useUpdateTable } from "../hooks/useUpdateTable";
import { useEmployeeDataStore } from "@/modules/Employees/store/useEmployeeDataStore";

export default function UpdateTableModal() {
  const {
    handleChange,
    handleSubmit,
    errors,
    closeModal,
    isOpen,
    values,
    loading,
  } = useUpdateTable();

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <form
        onSubmit={handleSubmit}
        className="p-5 w-[320px] rounded-2xl bg-white flex flex-col space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-900">Update Table</h2>
        <Field
          label="Table Number"
          name="tableNumber"
          type="number"
          value={values.tableNumber || ""}
          onChange={handleChange}
          error={errors.tableNumber}
          placeholder="Enter table number"
          fieldClassName="h-9 text-sm px-2 border-gray-300 focus:ring-blue-400"
        />
        {/* Table Name */}
        <Field
          label="Table Name"
          type="text"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter table name"
          fieldClassName="h-9 text-sm px-2 border-gray-300 focus:ring-blue-400"
        />

        {/* Capacity */}
        <Field
          label="Capacity"
          type="number"
          name="capacity"
          value={values.capacity || ""}
          onChange={handleChange}
          error={errors.capacity}
          placeholder="Enter number of seats"
          fieldClassName="h-9 text-sm px-2 border-gray-300 focus:ring-blue-400"
        />

        {/* Availability */}
        <Field
          label="Is Available"
          type="select"
          name="isAvailable"
          value={values.isAvailable ? "true" : "false"}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleChange({
              target: {
                name: "is_available",
                value: e.target.value === "true",
              },
            } as any)
          }
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          error={errors.isAvailable}
          fieldClassName="h-9 text-sm px-2 border-gray-300 focus:ring-blue-400"
        />
        {errors.general && (
          <p className="text-sm text-red-600">{errors.general}</p>
        )}

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 px-3 py-2 rounded-md border text-sm border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 px-3 py-2 cursor-pointer duration-300 active:scale-90 rounded-md text-sm text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
