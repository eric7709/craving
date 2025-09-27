"use client";

import { Table, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function TableNotAvailable() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.4, 0, 0.2, 1],
          staggerChildren: 0.1
        }}
        className="relative bg-white rounded-3xl border border-gray-100 p-6 max-w-sm w-full overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full -translate-y-12 translate-x-12" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-orange-100/30 to-transparent rounded-full translate-y-10 -translate-x-10" />

        {/* Main content */}
        <div className="relative z-10 text-center">
          {/* Animated icon container with bouncing table */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: 0.2
            }}
            className="relative mx-auto w-16 h-16 mb-4"
          >
            <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" />
            <div className="relative flex items-center justify-center w-full h-full bg-red-500 rounded-full">
              <motion.div
                animate={{ 
                  y: [0, -4, 0],
                  rotate: [0, -2, 2, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Table size={24} className="text-white" />
              </motion.div>
            </div>
            
            {/* Warning indicator */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
            >
              <AlertCircle size={12} className="text-white" />
            </motion.div>
          </motion.div>

          {/* Text content with stagger animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h1 className="text-lg font-bold text-gray-900 mb-2">
              Table Unavailable
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <p className="text-gray-600 text-xs leading-relaxed mb-2">
              This table is currently not accessible. It may be reserved, out of service, or temporarily unavailable.
            </p>
            <p className="text-gray-500 text-xs">
              Please contact a waiter for assistance.
            </p>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ delay: 0.8, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-16 left-3 w-1.5 h-1.5 bg-blue-400 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.15, x: 0 }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-16 right-4 w-2 h-2 bg-orange-400 rounded-full"
        />
      </motion.div>
    </div>
  );
}