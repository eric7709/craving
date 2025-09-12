"use client";

import { useState } from "react";
import { Field } from "@/global/components/Field";
import { useCreateEmployee } from "../hooks/useEmployeeServices";
import { useEmployeeUtilStore } from "../store/useEmployeeUtilStore";
import { useEmployeeDataStore } from "../store/useEmployeeDataStore";
import { EmployeeDomain } from "../services/employeeDomain";
import {
  createEmployeeInitials,
  employeeErrorInitials,
} from "../form/employee";
import { TCreateEmployee, TEmployee, TEmployeeError } from "../types/employee";
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

export default function CreateEmployeeModal() {
  const { mutate, isPending, isError, error } = useCreateEmployee();
  const { activeModal, closeModal } = useEmployeeUtilStore();
  const { addEmployee } = useEmployeeDataStore();
  const [form, setForm] = useState<TCreateEmployee>(createEmployeeInitials);
  const [errors, setErrors] = useState<TEmployeeError>(employeeErrorInitials);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    const {
      errors: validationErrors,
      isValid,
      data,
    } = EmployeeDomain.validateNewEmployee(form);

    setErrors({ ...employeeErrorInitials, ...validationErrors });
    if (!isValid) return;

    mutate(data, {
      onSuccess: (newEmployee) => {
        addEmployee(newEmployee as TEmployee);
        setForm(createEmployeeInitials);
        setErrors(employeeErrorInitials);
        closeModal();
      },
    });
  };

  return (
    <Modal isOpen={activeModal === "create"} onClose={closeModal}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-auto p-4 sm:p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Register Employee
        </h2>
        <p className="text-gray-500 text-xs mb-4">
          Fill in the details below to create a new account.
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
            value={form.lastname}
            onChange={handleChange}
          />
          {errors.lastname && (
            <p className="text-red-500 text-xs">{errors.lastname}</p>
          )}

          <Field
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}

          {/* Role dropdown */}
          <Field
            name="role"
            placeholder="Select Role"
            value={form.role}
            onChange={handleChange}
            type="select"
            options={roleOptions}
          />
          {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}

          <Field
            name="gender"
            placeholder="Select Gender"
            value={form.gender}
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
            value={form.phoneNumber}
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
            className="h-9 px-4 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="h-9 px-5 rounded-lg bg-green-500 text-white font-medium shadow hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isPending ? "Registering..." : "Register"}
          </button>
        </div>
      </motion.div>
    </Modal>
  );
}
