"use client";

import { useState, useEffect } from "react";
import { useUpdateEmployee } from "../hooks/useEmployeeServices";
import { useEmployeeUtilStore } from "../store/useEmployeeUtilStore";
import { useEmployeeDataStore } from "../store/useEmployeeDataStore";
import { EmployeeDomain } from "../services/employeeDomain";
import {
  employeeErrorInitials,
  updateEmployeeInitials,
} from "../form/employee";
import { TEmployee, TEmployeeError, TRole, TUpdateEmployee } from "../types/employee";
import Modal from "@/global/components/Modal";
import { FaUser, FaEnvelope, FaUserTie, FaVenusMars, FaPhone } from "react-icons/fa";

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
    const { errors: validationErrors, isValid, data } =
      EmployeeDomain.validateUpdateEmployee(form);

    setErrors({ ...employeeErrorInitials, ...validationErrors });
    if (!isValid) return;

    mutate(data, {
      onSuccess: (updatedEmployee: TEmployee) => {
        updateEmployee(updatedEmployee);
        setErrors(employeeErrorInitials);
        closeModal();
      },
    });
  };

  const labelClass =
    "text-xs font-medium text-gray-700 mb-1 flex items-center gap-1 ml-0.5";

  return (
    <Modal isOpen={activeModal === "update"} onClose={closeModal}>
      <div className="bg-gray-50 border-2 border-gray-200 rounded-3xl shadow-md w-full lg:w-[325px] mx-4 lg:mx-auto max-h-[80vh] flex flex-col">
        {/* Header */}
        <h2 className="text-base p-3 text-center h-fit border-b border-gray-200 font-semibold text-gray-900 mb-4">
          Update Employee
        </h2>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-4 pr-1">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstname" className={labelClass}>
              <FaUser className="text-blue-500" /> First Name
            </label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              value={form.firstname}
              onChange={handleChange}
              placeholder="Enter first name"
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400"
            />
            {errors.firstname && (
              <p className="text-xs text-red-600 mt-1">{errors.firstname}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastname" className={labelClass}>
              <FaUser className="text-green-500" /> Last Name
            </label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              value={form.lastname ?? ""}
              onChange={handleChange}
              placeholder="Enter last name"
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400"
            />
            {errors.lastname && (
              <p className="text-xs text-red-600 mt-1">{errors.lastname}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className={labelClass}>
              <FaEnvelope className="text-yellow-500" /> Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email ?? ""}
              onChange={handleChange}
              placeholder="Enter email"
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label htmlFor="role" className={labelClass}>
              <FaUserTie className="text-purple-500" /> Role
            </label>
            <select
              id="role"
              name="role"
              value={form.role ?? ""}
              onChange={handleChange}
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400"
            >
              <option value="">Select Role</option>
              {roleOptions.map((el) => (
                <option key={el.value} value={el.value}>
                  {el.label}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-xs text-red-600 mt-1">{errors.role}</p>
            )}
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label htmlFor="gender" className={labelClass}>
              <FaVenusMars className="text-pink-500" /> Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender ?? ""}
              onChange={handleChange}
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              {genderOptions.map((el) => (
                <option key={el.value} value={el.value}>
                  {el.label}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="text-xs text-red-600 mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className={labelClass}>
              <FaPhone className="text-green-600" /> Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={form.phoneNumber ?? ""}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400"
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-600 mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Error */}
          {isError && (
            <p className="text-xs text-red-600 mt-1 text-center">
              {(error as any)?.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex p-3 mx-4 mb-4 border-t bg-white border rounded-2xl border-gray-200 justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-5 py-2.5 cursor-pointer rounded-[10px] shadow-sm shadow-gray-600 text-xs font-medium transition duration-300 bg-gray-200 hover:bg-gray-300 text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className={`px-5 py-2.5 cursor-pointer rounded-[10px] shadow-sm shadow-gray-600 text-xs font-medium text-white transition duration-300 ${
              isPending
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
