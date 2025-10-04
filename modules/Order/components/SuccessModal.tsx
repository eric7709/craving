import Modal from "@/global/components/Modal";
import { TMenuItemsWithQtyAndTakeOut } from "../types/order";
import { TTable } from "@/modules/Tables/types/table";
import { formatPrice } from "@/global/utils/formatPrice";
import { FaCheckCircle, FaHome } from "react-icons/fa";

type Props = {
  selectedItems: TMenuItemsWithQtyAndTakeOut[];
  handleClose: () => void;
  selectedTable: TTable | null;
  customerName: string;
  formattedTotal: () => string;
  orderSuccess: boolean;
};

export default function SuccessModal({
  selectedItems,
  formattedTotal,
  orderSuccess,
  handleClose,
  customerName,
  selectedTable,
}: Props) {
  return (
    <Modal isOpen={orderSuccess} onClose={handleClose}>
      <div className="w-[340px] border-2 border-gray-200 rounded-3xl shadow-md bg-gray-50 flex flex-col">
        {/* ✅ Header */}
        <h2 className="text-base px-4 py-3 text-center border-b border-gray-200 font-semibold text-green-600 flex items-center justify-center gap-2">
          <FaCheckCircle className="text-green-500" />
          Order Placed!
        </h2>

        {/* ✅ Thank You Section */}
        <div className="px-4 py-3 text-center text-sm text-gray-600">
          Your order has been placed successfully!
          <br />
          {selectedTable?.waiter ? (
            <>
              <span className="font-semibold inline-block mt-1 text-gray-800">
                {selectedTable.waiter.firstname}
              </span>{" "}
              will be serving your table shortly.
            </>
          ) : (
            "Your order will arrive shortly."
          )}
        </div>

        {/* ✅ Ordered Items */}
        <div className="px-4 py-3 max-h-[45vh] overflow-y-auto space-y-2">
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white border border-gray-200 rounded-md p-2 text-sm"
            >
              {/* Left side: name + qty + home icon if takeOut */}
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">
                  {item.name} × {item.quantity}
                </span>
                {item.takeOut && (
                  <FaHome className="text-blue-500" title="Take home" />
                )}
              </div>

              {/* Right side: price */}
              <span className="font-bold text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Total Section */}
        <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center text-sm font-medium bg-green-50 rounded-b-xl">
          <span>Total</span>
          <span className="text-base font-bold text-green-700">
            {formattedTotal()}
          </span>
        </div>

        {/* ✅ Footer Button */}
        <div className="flex p-3 border-t bg-white m-2 border rounded-2xl border-gray-200 justify-center">
          <button
            onClick={handleClose}
            className="w-full py-2.5 px-6 cursor-pointer rounded-[10px] shadow-sm shadow-gray-600 text-xs font-medium text-white transition duration-300 bg-blue-600 hover:bg-blue-700"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </Modal>
  );
}
