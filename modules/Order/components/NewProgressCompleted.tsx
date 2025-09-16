"use client";
import { motion } from "framer-motion";
import { useOrderDataStore } from "../store/useOrderDataStore";

export default function NewProgressCompleted() {
  const orders = useOrderDataStore((state) => state.orders);
  const newCount = orders.filter((o) => o.status === "new").length;
  const inProgressCount = orders.filter(
    (o) => o.status === "in progress"
  ).length;
  const completedCount = orders.filter((o) => o.status === "completed").length;
  const { setStatus } = useOrderDataStore();
  const circles = [
    { color: "bg-yellow-400", label: "New", count: newCount },
    { color: "bg-blue-500", label: "In Progress", count: inProgressCount },
    { color: "bg-green-500", label: "Completed", count: completedCount },
  ];

  return (
    <div className="flex items-center gap-4">
      {circles
        .filter((circle) => circle.count > 0) 
        .map((circle, index) => (
          <motion.div
            onClick={() => {
              if (circle.label == "New") {
                setStatus("new");
                if (circle.count == 0) {
                  setStatus("all");
                }
              }
              if (circle.label == "In Progress") {
                setStatus("in progress");
                if (circle.count == 0) {
                  setStatus("all");
                }
              }
              if (circle.label == "Completed") {
                setStatus("completed");
                if (circle.count == 0) {
                  setStatus("all");
                }
              }
            }}
            key={index}
            className={`w-8 h-8 flex cursor-pointer flex-col items-center justify-center rounded-full shadow-md ${circle.color} text-white border-2 font-bold text-sm`}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 0.2,
              delay: index * 0.2,
            }}
          >
            <span>{circle.count}</span>
          </motion.div>
        ))}
    </div>
  );
}
