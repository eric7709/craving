"use client";

import { Plus, UserPlus } from "lucide-react";

type AddCardProps = {
  title: string;
  description: string;
  onClick: () => void;
  color?: "blue" | "green";
  icon?: "plus" | "userPlus";
};

export function AddCard({
  title,
  description,
  onClick,
  color = "blue",
  icon = "plus",
}: AddCardProps) {
  const colorMap = {
    blue: {
      bgFrom: "from-blue-50",
      bgTo: "to-indigo-100",
      hoverFrom: "hover:from-blue-100",
      hoverTo: "hover:to-indigo-200",
      border: "border-blue-300 hover:border-blue-400",
      circle: "bg-blue-500 group-hover:bg-blue-600",
      text: "text-blue-700 group-hover:text-blue-800",
      subtext: "text-blue-600 group-hover:text-blue-700",
    },
    green: {
      bgFrom: "from-green-50",
      bgTo: "to-emerald-100",
      hoverFrom: "hover:from-green-100",
      hoverTo: "hover:to-emerald-200",
      border: "border-green-300 hover:border-green-400",
      circle: "bg-green-500 group-hover:bg-green-600",
      text: "text-green-700 group-hover:text-green-800",
      subtext: "text-green-600 group-hover:text-green-700",
    },
  };

  const Icon = icon === "userPlus" ? UserPlus : Plus;

  return (
    <div
      onClick={onClick}
      className={`group h-52 bg-gradient-to-br ${colorMap[color].bgFrom} ${colorMap[color].bgTo} ${colorMap[color].hoverFrom} ${colorMap[color].hoverTo} border-2 border-dashed ${colorMap[color].border} rounded-xl cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 hover:shadow-md active:scale-100`}
    >
      <div
        className={`w-12 h-12 ${colorMap[color].circle} rounded-full flex items-center justify-center transition-colors duration-300`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-center">
        <h3
          className={`font-semibold ${colorMap[color].text} transition-colors`}
        >
          {title}
        </h3>
        <p className={`text-sm ${colorMap[color].subtext} transition-colors`}>
          {description}
        </p>
      </div>
    </div>
  );
}
