import { Plus } from "lucide-react";
import React from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";

export default function page() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {[1, 2, 3].map(() => (
        <div className="flex gap-2 text-sm w-full max-w-96 rounded-3xl shadow-md p-2 border-2  relative">
          <div className="h-24 w-24 shrink-0 border-2 rounded-3xl"></div>
          <div className="w-full flex flex-col justify-between">
            <p className="text-[15px] font-semibold">Grilled Chicken</p>
            <p className="text-xs">
              <span className="text-gray-500">Price Per 1:</span>
              <span className="font-medium"> $300.00</span>
            </p>
            <div className="absolute top-3 right-3 ">
              <FaTrashAlt />
            </div>
            <div className="flex items-center w-full justify-between">
              <div className="flex gap-2 bg-white p-1 rounded-full shadow-md items-center">
                <div className="h-7 w-7 duration-300 cursor-pointer active:scale-90 hover:bg-green-500 rounded-full bg-gray-200 grid place-content-center">
                  <FaPlus size={10} />
                </div>
                <div className="w-4 flex justify-center">
                  <p>1</p>
                </div>
                <div className="h-7 w-7 duration-300 cursor-pointer active:scale-90 hover:bg-red-500 rounded-full bg-gray-200 grid place-content-center">
                  <FaMinus size={10} />
                </div>
              </div>
              <p className="font-semibold">$5920</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
