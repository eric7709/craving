import { TTable } from "../types/table";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { Trash2, QrCode } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { useTableUtilStore } from "../store/useTableUtilStore";

export default function TableCard(table: TTable) {
  const hasWaiter = !!table.waiter;
  const {
    openUpdateTableModal,
    openDeleteTableModal,
    openAllocateModal,
    openDeallocateModal,
    openQRCodeModal,
    setSelectedTable,
  } = useTableUtilStore();

  return (
    <div
      onClick={() => {
        setSelectedTable(table);
        openUpdateTableModal();
      }}
      className={`h-56 cursor-pointer hover:scale-[1.01] duration-300 shadow-md rounded-xl flex flex-col items-center justify-center text-white font-semibold
       bg-emerald-950 p-4`}
    >
      <GiForkKnifeSpoon className="text-3xl mb-2" />
      <p className="text-5xl">{table.tableNumber}</p>
      <h2 className="text-lg">{table.name}</h2>
      <p
        className={`mt-2 ${
          hasWaiter ? "text-green-500" : "text-red-500"
        } text-sm`}
      >
        {hasWaiter ? table.waiter?.firstname : "Unassigned"}
      </p>

      <div className="flex gap-3 mt-4">
        <div
          onClick={(e) => {
            openDeleteTableModal();
            setSelectedTable(table);
            e.stopPropagation();
          }}
          className="h-8 w-8 rounded-full duration-300 border-2 grid place-content-center hover:bg-red-500 transition"
        >
          <Trash2 size={16} />
        </div>

        <div
          onClick={(e) => {
            if (table?.waiter?.id) {
              openDeallocateModal();
              setSelectedTable(table);
            } else {
              openAllocateModal();
              setSelectedTable(table);
            }
            e.stopPropagation();
          }}
          className="h-8 w-8 rounded-full duration-300 border-2 grid place-content-center hover:bg-green-500 transition"
        >
          <FaUser size={16} />
        </div>
        <div
          onClick={(e) => {
            openQRCodeModal();
            setSelectedTable(table);
            e.stopPropagation();
          }}
          className="h-8 w-8 rounded-full duration-300 border-2 grid place-content-center hover:bg-blue-500 transition"
        >
          <QrCode size={16} />
        </div>
      </div>
    </div>
  );
}
