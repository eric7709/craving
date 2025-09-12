"use client";
import { useGetOrCreateCustomer } from "@/modules/Customer/hooks/useCustomerServices";
import { CustomerDomain } from "@/modules/Customer/services/customerDomain";
import { motion } from "framer-motion";
import { Smile } from "lucide-react";
import { useEffect, useState } from "react";
import { useOrderUtilStore } from "../store/useOrderUtilStore";

const formValues = {
  name: "",
  email: "",
  phoneNumber: "",
};

export default function CreateCustomerModal() {
  const [form, setForm] = useState(formValues);
  const { mutate, data, isPending } = useGetOrCreateCustomer();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { activeModal, openCreateCustomerModal, openOrderSummaryModal } =
    useOrderUtilStore();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = "Full name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    mutate(form);
  };
  useEffect(() => {
    if (data) {
      CustomerDomain.saveCustomer(data);
      setForm(formValues);
      openOrderSummaryModal();
    }
  }, [data]);

  useEffect(() => {
    openCreateCustomerModal();
  }, []);

  return (
    <div
      className={`fixed z-50 bg-white inset-0 duration-300 ${
        activeModal == "customer"
          ? "opacity-100 visible"
          : "invisible opacity-0"
      } h-screen pt-20 mx-auto p-3 flex flex-col items-center`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.6 }}
        className="bg-yellow-100 p-4 rounded-full mb-4"
      >
        <Smile className="w-12 h-12 text-yellow-600" />
      </motion.div>

      {/* Friendly text */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-center mb-2"
      >
        We’d Love to Know You 😊
      </motion.h1>
      <p className="text-center px-5 text-gray-600 mb-6">
        Please share your information so we can serve you better.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-4 space-y-5 w-full shadow-md"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="mt-1 w-full rounded-md border border-blue-400 px-3 py-2 placeholder:text-sm text-base outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="mt-1 w-full rounded-md border border-blue-400 px-3 py-2 placeholder:text-sm text-base outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone (Optional)
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phoneNumber number"
            className="mt-1 w-full rounded-md border border-blue-400 px-3 py-2 placeholder:text-sm text-base outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-blue-500 text-white py-2 font-semibold hover:bg-blue-600 active:scale-95 transition disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Let’s Get Started 🚀"}
        </button>
      </form>
    </div>
  );
}
