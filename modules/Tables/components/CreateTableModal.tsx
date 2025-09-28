import Modal from "@/global/components/Modal";
import { useCreateTable } from "../hooks/useCreateTable";
import { useEmployeeDataStore } from "@/modules/Employees/store/useEmployeeDataStore";
import { FaChair, FaHashtag, FaUsers, FaCheckCircle, FaUserTie } from "react-icons/fa";

export default function CreateTableModal() {
  const { handleChange, handleSubmit, errors, closeModal, isOpen, values, loading } =
    useCreateTable();
  const { waitersOptions } = useEmployeeDataStore();

  const labelClass = "text-xs font-medium text-gray-700 mb-1 flex items-center gap-1 ml-0.5";

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <form
        onSubmit={handleSubmit}
        className="w-[320px] border-2 border-gray-200 rounded-3xl shadow-md bg-gray-50 flex flex-col"
      >
        <h2 className="text-base px-4 py-3 text-center border-b border-gray-200 font-semibold text-gray-900">
          Create New Table
        </h2>

        <div className="px-4 space-y-4 py-4">
          {/* Table Number */}
          <div className="flex flex-col">
            <label htmlFor="tableNumber" className={labelClass}>
              <FaHashtag className="text-blue-500" /> Table Number
            </label>
            <input
              id="tableNumber"
              name="tableNumber"
              type="number"
              value={values.tableNumber || ""}
              onChange={handleChange}
              placeholder="Enter table number"
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400"
            />
            {errors.tableNumber && (
              <p className="text-xs text-red-600 mt-1">{errors.tableNumber}</p>
            )}
          </div>

          {/* Table Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className={labelClass}>
              <FaChair className="text-green-500" /> Table Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={values.name || ""}
              onChange={handleChange}
              placeholder="Enter table name"
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400"
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>

          {/* Capacity */}
          <div className="flex flex-col">
            <label htmlFor="capacity" className={labelClass}>
              <FaUsers className="text-yellow-500" /> Capacity
            </label>
            <input
              id="capacity"
              type="number"
              name="capacity"
              placeholder="Enter number of seats"
              value={values.capacity || ""}
              onChange={handleChange}
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400"
            />
            {errors.capacity && <p className="text-xs text-red-600 mt-1">{errors.capacity}</p>}
          </div>

          {/* Availability */}
          <div className="flex flex-col">
            <label htmlFor="isAvailable" className={labelClass}>
              <FaCheckCircle className="text-purple-500" /> Is Available
            </label>
            <select
              id="isAvailable"
              name="isAvailable"
              value={values.isAvailable ? "true" : "false"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleChange({
                  target: { name: "isAvailable", value: e.target.value === "true" },
                } as any)
              }
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.isAvailable && <p className="text-xs text-red-600 mt-1">{errors.isAvailable}</p>}
          </div>

          {/* Waiter */}
          <div className="flex flex-col">
            <label htmlFor="waiterId" className={labelClass}>
              <FaUserTie className="text-pink-500" /> Waiter
            </label>
            <select
              id="waiterId"
              name="waiterId"
              value={values.waiterId || ""}
              onChange={handleChange}
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400"
            >
              <option value="">Assign waiter (optional)</option>
              {waitersOptions().map((el) => (
                <option key={el.value} value={el.value}>
                  {el.label}
                </option>
              ))}
            </select>
            {errors.waiterId && <p className="text-xs text-red-600 mt-1">{errors.waiterId}</p>}
          </div>

          {errors.general && <p className="text-sm text-red-600">{errors.general}</p>}
        </div>

        {/* Buttons */}
        <div className="flex p-3 border-t bg-white m-2 border rounded-2xl border-gray-200 justify-end gap-2">
          <button
            type="button"
            onClick={closeModal}
            className={`px-5 py-2.5 shadow-sm shadow-gray-600 cursor-pointer rounded-[10px] text-xs font-medium transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                : "bg-gray-200 hover:bg-gray-300 text-black"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2.5 cursor-pointer rounded-[10px] shadow-sm shadow-gray-600 text-xs font-medium text-white transition duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
