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
      className="relative h-52 cursor-pointer duration-300 rounded-xl flex flex-col items-center justify-center text-white font-semibold p-4 group perspective-1000"
      style={{
        transformStyle: "preserve-3d",
        background: "linear-gradient(135deg, #1e40af 0%, #0f172a 100%)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.2)",
        transform: "translateZ(0) rotateX(2deg)",
        transition: "all 0.3s ease"
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "perspective(1000px) rotateX(2deg) rotateY(0deg) translateZ(0px)";
      }}
    >
      {/* Shine effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
          backgroundSize: "200% 200%",
          animation: "shine 2s infinite"
        }}
      />

      {/* 3D border effect */}
      <div 
        className="absolute inset-0 rounded-xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
          transform: "translateZ(-5px)"
        }}
      />

      {/* Vertical Unavailable Label */}
      {!table.isAvailable && (
        <div 
          className="absolute left-0 top-0 h-full flex items-center z-20"
          style={{ transform: "translateZ(20px)" }}
        >
          <span className="text-xs font-bold tracking-widest text-white bg-red-600 px-2 py-1 rounded-l-md rotate-180 [writing-mode:vertical-rl] shadow-lg">
            UNAVAILABLE
          </span>
        </div>
      )}

      {/* Main content with 3D layers */}
      <div 
        className="relative z-10"
        style={{ transform: "translateZ(15px)" }}
      >
        <GiForkKnifeSpoon className="text-3xl shrink-0 mb-2 drop-shadow-lg" />
      </div>
      
      <p 
        className="text-3xl drop-shadow-lg relative z-10"
        style={{ transform: "translateZ(20px)" }}
      >
        {table.tableNumber}
      </p>
      
      <h2 
        className="text-base drop-shadow-md relative z-10"
        style={{ transform: "translateZ(18px)" }}
      >
        {table.name}
      </h2>
      
      <p
        className={`mt-2 ${
          hasWaiter ? "text-green-400" : "text-red-400"
        } text-sm drop-shadow-md relative z-10`}
        style={{ transform: "translateZ(16px)" }}
      >
        {hasWaiter ? table.waiter?.firstname : "Unassigned"}
      </p>

      {/* Action buttons with enhanced 3D */}
      <div 
        className="flex gap-3 mt-4 relative z-10"
        style={{ transform: "translateZ(25px)" }}
      >
        <div
          onClick={(e) => {
            openDeleteTableModal();
            setSelectedTable(table);
            e.stopPropagation();
          }}
          className="h-8 w-8 rounded-full duration-300 border-2 border-white/30 backdrop-blur-sm grid place-content-center hover:bg-red-500 hover:border-red-400 hover:scale-110 transition active:scale-95 shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
          }}
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
          className="h-8 w-8 rounded-full duration-300 border-2 border-white/30 backdrop-blur-sm grid place-content-center hover:bg-green-500 hover:border-green-400 hover:scale-110 transition active:scale-95 shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <FaUser size={16} />
        </div>
        
        <div
          onClick={(e) => {
            openQRCodeModal();
            setSelectedTable(table);
            e.stopPropagation();
          }}
          className="h-8 w-8 rounded-full duration-300 border-2 border-white/30 backdrop-blur-sm grid place-content-center hover:bg-blue-500 hover:border-blue-400 hover:scale-110 transition active:scale-95 shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <QrCode size={16} />
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { background-position: -200% -200%; }
          100% { background-position: 200% 200%; }
        }
      `}</style>
    </div>
  );
}