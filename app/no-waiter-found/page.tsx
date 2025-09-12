"use client";
import { motion } from "framer-motion";
import { UserX } from "lucide-react";

export default function WaiterNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-white px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center justify-center w-24 h-24 rounded-full bg-red-100 shadow-md mb-6"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <UserX className="w-12 h-12 text-red-600" />
        </motion.div>
      </motion.div>

      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-2">
        Waiter Not Assigned
      </h1>
      <p className="text-gray-600 text-center text-sm sm:text-base max-w-md">
        This table does not currently have a waiter assigned. Please contact the
        manager or assign a waiter to continue.
      </p>
    </div>
  );
}
