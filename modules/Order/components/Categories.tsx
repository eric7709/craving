"use client";
import { useCategoryDataStore } from "@/modules/Category/store/useCategoryDataStore";

import { useMenuItemDataStore } from "@/modules/MenuItem/store/useMenuItemDataStore";

export default function Categories() {
  const { categories } = useCategoryDataStore();
  const { category, setCategory } = useMenuItemDataStore();

  return (
    <div className=" ">
      <div className="mx-3 flex  px-3 py-2 scrollbar-none overflow-x-auto space-x-2">

      {["all", ...categories.map((c) => c.name)].map((name, index, arr) => {
        const isSelected = name.toLowerCase() === category.toLowerCase();
        return (
          <div
            key={index}
            onClick={() => setCategory(name)}
            className={`flex-shrink-0 capitalize  active:scale-90 cursor-pointer px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200
                  ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800 hover:bg-gray-200"
                  }`}
          >
            {name}
          </div>
        );
      })}
      </div>
    </div>
  );
}
