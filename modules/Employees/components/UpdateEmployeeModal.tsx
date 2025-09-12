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

  // Prefill form when employee is passed
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
        className="bg-white rounded-xl shadow-xl w-full lg:w-[320px] mx-auto p-4 sm:p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Update Employee
        </h2>
        <p className="text-gray-500 text-xs mb-4">
          Update employee details below.
        </p>

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

        {isError && (
          <p className="text-red-600 text-xs mt-2 text-center">
            {(error as any)?.message}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="h-8 px-3 rounded-md bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="h-8 px-4 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </motion.div>
    </Modal>
  );
}
