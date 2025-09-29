import { Plus } from "lucide-react";

import { useTableUtilStore } from "../store/useTableUtilStore";

export default function CreateTableCard() {
  const { openCreateTableModal } = useTableUtilStore();
  return (
    <div
      onClick={openCreateTableModal}
      className="group h-52 bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200 border-2 border-dashed border-blue-300 hover:border-blue-400 rounded-xl cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:scale-[1.01] active:scale-100"
    >
      <div className="w-12 h-12 bg-blue-500 group-hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300">
        <Plus className="w-6 h-6 text-white" />
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-blue-700 group-hover:text-blue-800 transition-colors">
        Add Table
        </h3>
        <p className="text-sm text-blue-600 group-hover:text-blue-700 transition-colors">
          Create a new Table
        </p>
      </div>
    </div>
  );
}
