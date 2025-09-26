import { TCustomer } from "../types/customer";
import { UserCircle } from "lucide-react";
import { formatRelativeDate } from "@/global/utils/formatRelativeDate";

type Props = {
  customer: TCustomer;
};

export default function CustomerCard({ customer }: Props) {
  return (
    <div className="w-full max-w-md p-5 h-32 rounded-2xl bg-blue-950 shadow-xl border border-blue-800 flex items-center gap-4 hover:bg-blue-800 hover:shadow-2xl transition">
      {/* Avatar */}
      <div className="p-2.5 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 shadow-md">
        <UserCircle size={33} className="text-white" />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-0.5 text-white flex-1">
        {/* Name */}
        <p className="text-sm font-semibold capitalize">{customer.name}</p>

        {/* Email */}
        <a
          href={`mailto:${customer.email}`}
          className="text-xs text-blue-300 hover:underline truncate"
        >
          {customer.email}
        </a>

        {/* Phone */}
        {customer?.phoneNumber && (
          <a
            href={`tel:${customer.phoneNumber}`}
            className="text-xs text-green-400 hover:underline"
          >
            {customer.phoneNumber}
          </a>
        )}

        {/* Last Visit */}
        <p className="text-[10px] text-gray-300 italic mt-0.5">
          {customer.lastVisit
            ? `Last visit: ${formatRelativeDate(customer.lastVisit)}`
            : "No visits yet"}
        </p>
      </div>
    </div>
  );
}
