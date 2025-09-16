"use client";
import { Search } from "lucide-react";

export default function NoMenuItemsFound() {
  return (
    <div className={`flex flex-col flex-1 items-center justify-center py-16 text-center text-gray-500`}>
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
        <Search className="w-8 h-8 text-yellow-500" />
      </div>
      <h2 className="text-lg font-semibold text-gray-700">
        No menu items found
      </h2>
      <p className="text-sm text-gray-500 mt-1 max-w-xs">
        Try adjusting your search or explore other categories.
      </p>
    </div>
  );
}
