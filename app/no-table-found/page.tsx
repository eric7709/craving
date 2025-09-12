"use client";
import React from "react";
import { motion } from "framer-motion";
import { Table } from "lucide-react";

export default function TableNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <motion.div
        className="flex items-center justify-center mb-6 rounded overflow-hidden"
        animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Table className="w-16 h-16 text-red-500" />
      </motion.div>
      <h1 className="text-2xl font-bold text-red-600">Table Incorrect</h1>
      <p className="text-gray-500 mt-2">
        The table you are looking for does not exist.
      </p>
    </div>
  );
}
