"use client";
import { useState, useEffect } from "react";
import { Field } from "@/global/components/Field";
import { useUpdateEmployee } from "../hooks/useEmployeeServices";
import { useEmployeeUtilStore } from "../store/useEmployeeUtilStore";
import { useEmployeeDataStore } from "../store/useEmployeeDataStore";
import { EmployeeDomain } from "../services/employeeDomain";
import {
  employeeErrorInitials,
  updateEmployeeInitials,
} from "../form/employee";
import {
  TEmployee,
  TEmployeeError,
  TRole,
  TUpdateEmployee,
} from "../types/employee";
import Modal from "@/global/components/Modal";
import { motion } from "framer-motion";
import { UserPen } from "lucide-react";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const roleOptions = [
  { value: "manager", label: "Manager" },
  { value: "cook", label: "Cook" },
  { value: "chef", label: "Chef" },
  { value: "waiter", label: "Waiter" },
  { value: "cashier", label: "Cashier" },
];

export default function UpdateEmployeeModal() {
  const { mutate, isPending, isError, error } = useUpdateEmployee();
  const { activeModal, closeModal, selectedEmployee } = useEmployeeUtilStore();
  const { updateEmployee } = useEmployeeDataStore();

  const [form, setForm] = useState<TUpdateEmployee>(updateEmployeeInitials);
  const [errors, setErrors] = useState<TEmployeeError>(employeeErrorInitials);

  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        id: selectedEmployee.id,
        firstname: selectedEmployee.firstname,
        lastname: selectedEmployee.lastname,
        email: selectedEmployee.email,
        phoneNumber: selectedEmployee.phoneNumber,
        gender: selectedEmployee.gender,
        role: selectedEmployee.role as TRole,
        isActive: selectedEmployee.isActive,
      });
    }
  }, [selectedEmployee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    if (!selectedEmployee) return;
    const {
      errors: validationErrors,
      isValid,
      data,
    } = EmployeeDomain.validateUpdateEmployee(form);

    setErrors({ ...employeeErrorInitials, ...validationErrors });
    if (!isValid) return;
    mutate(data, {
      onSuccess: (updatedEmployee) => {
        updateEmployee(updatedEmployee as TEmployee);
        setErrors(employeeErrorInitials);
        closeModal();
      },
    });
  };

  return (
    <Modal isOpen={activeModal === "update"} onClose={closeModal}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl shadow-xl w-full max-w-[400px] mx-auto p-5 border border-indigo-100"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 shadow-sm">
            <UserPen size={16} />
          </div>
          <h2 className="text-base font-semibold text-gray-800">
            Update Employee
          </h2>
        </div>
        <p className="text-gray-500 text-xs mb-5">
          Edit employee details and save changes.
        </p>

        {/* Form */}
        <div className="space-y-3">
          <Field
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={handleChange}
          />
          {errors.firstname && (
            <p className="text-red-500 text-xs">{errors.firstname}</p>
          )}

          <Field
            name="lastname"
            placeholder="Last Name"
            value={form.lastname ?? ""}
            onChange={handleChange}
          />
          {errors.lastname && (
            <p className="text-red-500 text-xs">{errors.lastname}</p>
          )}

          <Field
            name="email"
            placeholder="Email"
            type="email"
            value={form.email ?? ""}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}

          <Field
            name="role"
            placeholder="Select Role"
            value={form.role ?? ""}
            onChange={handleChange}
            type="select"
            options={roleOptions}
          />
          {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}

          <Field
            name="gender"
            placeholder="Select Gender"
            value={form.gender ?? ""}
            onChange={handleChange}
            type="select"
            options={genderOptions}
          />
          {errors.gender && (
            <p className="text-red-500 text-xs">{errors.gender}</p>
          )}

          <Field
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber ?? ""}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Error */}
        {isError && (
          <p className="text-red-600 text-xs mt-3 text-center">
            {(error as any)?.message}
          </p>
        )}

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-5 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-sm font-medium shadow hover:from-indigo-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </motion.div>
    </Modal>
  );
}
