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
import { UserPlus } from "lucide-react";

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
    const { errors: validationErrors, isValid, data } =
      EmployeeDomain.validateNewEmployee(form);

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
        className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-xl w-full max-w-[400px] mx-auto p-5"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-full bg-green-100 text-green-600">
            <UserPlus size={16} />
          </div>
          <h2 className="text-base font-semibold text-gray-800">
            Register Employee
          </h2>
        </div>
        <p className="text-gray-500 text-xs mb-5">
          Fill in the details below to create a new account.
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
            className="px-5 py-2 rounded-md bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-6 py-2 rounded-md bg-green-500 text-white font-medium shadow hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm cursor-pointer"
          >
            {isPending ? "Registering..." : "Register"}
          </button>
        </div>
      </motion.div>
    </Modal>
  );
}
