import React from "react";
import { TCustomer } from "../types/customer";
import { UserCircle } from "lucide-react";
import { formatRelativeDate } from "@/global/utils/formatRelativeDate";

type Props = {
  customer: TCustomer;
};

export default function CustomerCard({ customer }: Props) {
  return (
    <div className="w-full h-56 p-5 rounded-2xl shadow-md bg-teal-900 shadow-blue-900 flex flex-col items-center gap-3 text-white hover:bg-neutral-800 transition">
      {/* Avatar */}
      <div className="p-3 rounded-full bg-neutral-700 shadow-inner">
        <UserCircle size={34} className="text-blue-400" />
      </div>

      {/* Name */}
      <p className="text-lg font-bold capitalize text-white">
        {customer.name}
      </p>

      {/* Email (clickable) */}
      <a
        href={`mailto:${customer.email}`}
        className="text-xs text-blue-400 hover:underline"
      >
        {customer.email}
      </a>

      {/* Phone (clickable) */}
      {customer?.phoneNumber && (
        <a
          href={`tel:${customer.phoneNumber}`}
          className="text-sm text-green-400 hover:underline"
        >
          {customer.phoneNumber}
        </a>
      )}

      {/* Last Visit */}
      <div className="text-xs text-gray-400 italic">
        {customer.lastVisit
          ? `Last visit: ${formatRelativeDate(customer.lastVisit)}`
          : "No visits yet"}
      </div>
    </div>
  );
}
