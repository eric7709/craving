"use client";
import FadeInContainer from "@/global/components/FadeInContainer";
import { useUser } from "@/global/hooks/useUser";
import { useTableDataStore } from "@/modules/Tables/store/useTableDataStore";
import React from "react";

export default function WaiterTableList() {
  const { allTables, isLoading: APILoading } = useTableDataStore();
  const { profileID } = useUser();

  // Show loading while API is loading OR if we don't have profileID yet OR if allTables is empty but still loading
  if (
    APILoading ||
    !profileID ||
    (APILoading === false && allTables.length === 0)
  ) {
    return (
      <div className="flex text-sm text-gray-800 items-center flex-1 justify-center h-32">
        <p>Loading your tables...</p>
      </div>
    );
  }

  // Filter tables only after we're sure data has loaded
  const myTables = allTables.filter((el) => el.waiter?.id === profileID);

  // Show "no tables" only when we have data but no matches
  if (allTables.length > 0 && myTables.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500 text-sm italic">
        No tables assigned
      </div>
    );
  }

  return (
    <FadeInContainer>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
        {myTables.map((el) => (
          <div
            key={el.id}
            className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 cursor-pointer"
          >
            {/* Header */}
            <div className="bg-indigo-600 text-white p-3 text-center font-bold text-lg">
              Table {el.tableNumber}
            </div>

            {/* Body */}
            <div className="p-6 text-center space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Name
              </p>
              <p className="text-base font-semibold text-gray-800">{el.name}</p>
            </div>
          </div>
        ))}
      </div>
    </FadeInContainer>
  );
}
