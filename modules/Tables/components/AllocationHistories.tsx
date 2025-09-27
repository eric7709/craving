"use client";
import { useTableAllocationDataStore } from "../store/useTableAllocationDataStore";
import { motion } from "framer-motion";
import { Clock, Table as TableIcon, UserRound } from "lucide-react";
import AllocationHistoryDateDropdown from "./AllocationHistoryDateDropdown";

export default function AllocationHistories() {
  const { allocations, loading } = useTableAllocationDataStore();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-xl font-semibold tracking-tight">
          Allocation History
        </h1>
        <AllocationHistoryDateDropdown />
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <motion.div
            className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
      ) : allocations?.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 text-center py-8 text-base"
        >
          No allocations found for the selected date range.
        </motion.p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
          {allocations?.map((a) => {
            const isActive = !a?.deallocatedAt;
            return (
              <motion.div
                key={a?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-900 rounded-lg p-4 shadow-md hover:shadow-lg transition relative"
              >
                {isActive && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    Active
                  </span>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <TableIcon className="h-4 w-4 text-indigo-300" />
                  <p className="text-base text-white font-semibold">
                    {a?.tableNumber} - {a?.tableName}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-300 mb-1 text-sm">
                  <UserRound className="h-3.5 w-3.5 text-green-400" />
                  <span>
                    {a.waiterFirstname
                      ? `${a?.waiterFirstname} ${a?.waiterLastname}`
                      : "Unassigned"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <Clock className="h-3.5 w-3.5 text-yellow-400" />
                  <span>
                    Allocated: {new Date(a.allocatedAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <Clock className="h-3.5 w-3.5 text-red-400" />
                  <span>
                    {a.deallocatedAt
                      ? `Deallocated: ${new Date(
                          a.deallocatedAt
                        ).toLocaleString()}`
                      : "Not yet deallocated"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
