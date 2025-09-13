"use client";

import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Modal from "@/global/components/Modal";
import { useOrderUtilStore } from "../store/useOrderUtilStore";
import { formatPrice } from "@/global/utils/formatPrice";
import { useCreateOrder } from "../hooks/useOrderServices";
import { CustomerDomain } from "@/modules/Customer/services/customerDomain";
import { getUnavailableMenuItems } from "@/app/actions/menuItemActions";
import { generateOrderNumber } from "@/global/utils/generateOrderNumber";
import { useMenuItemDataStore } from "@/modules/MenuItem/store/useMenuItemDataStore";

export default function OrderSummary() {
  const {
    isSummaryModalOpen,
    closeModal,
    selectedTable,
    clearSelectedItem,
    removeFromCart,
    formattedTotal,
    openCreateCustomerModal,
    selectedItems,
    existsInCart,
    activeModal,
    total,
  } = useOrderUtilStore();

  const { menuItems } = useMenuItemDataStore();
  const [unavailableItems, setUnavailableItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const { mutate, isPending, error } = useCreateOrder();

  // Auto-close if no items
  useEffect(() => {
    if (selectedItems.length === 0) closeModal();
  }, [selectedItems, closeModal]);

  // Reset unavailable
  useEffect(() => {
    setUnavailableItems([]);
  }, [activeModal, selectedItems]);

  // Remove unavailable items
  useEffect(() => {
    menuItems.forEach((el) => {
      if (!el.isAvailable && existsInCart(el.id) && !activeModal) {
        removeFromCart(el.id);
      }
    });
  }, [menuItems, existsInCart, activeModal, removeFromCart]);

  const handleConfirm = async () => {
    if (!selectedTable) return alert("Please select a table first");
    if (!selectedTable.waiter) return alert("No waiter assigned to this table");

    const customer = CustomerDomain.getCustomer();
    if (!customer) {
      openCreateCustomerModal();
      return;
    }

    setCustomerName(customer.name);
    setIsLoading(true);

    try {
      const unavailable = await getUnavailableMenuItems();
      const itemsUnavailable = selectedItems.filter((item) =>
        unavailable.includes(item.id)
      );

      if (itemsUnavailable.length > 0) {
        setUnavailableItems(itemsUnavailable.map((item) => item.id));
        return;
      }

      mutate(
        {
          items: selectedItems.map(({ id, name, price, quantity, takeOut }) => ({
            id,
            name,
            price,
            quantity,
            takeOut,
          })),
          tableId: selectedTable.id,
          waiterId: selectedTable.waiter.id,
          total: total(),
          orderNumber: generateOrderNumber(),
          customerId: customer.id,
        },
        {
          onSuccess: () => setOrderSuccess(true),
        }
      );
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (orderSuccess) clearSelectedItem();
    setUnavailableItems([]);
    setOrderSuccess(false);
    closeModal();
  };

  // ✅ Success Modal
  if (orderSuccess) {
    return (
      <Modal isOpen={orderSuccess} onClose={handleClose}>
        <div className="w-[340px] max-w-[92vw] p-5">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 text-center space-y-3">
            <h2 className="text-lg font-bold text-green-600">✅ Order Placed!</h2>
            <p className="text-sm text-gray-600">
              Thank you,{" "}
              <span className="font-semibold text-gray-800">{customerName}</span>
              .<br />
              {selectedTable?.waiter ? (
                <>
                  <span className="font-semibold text-gray-800">
                    {selectedTable.waiter.firstname}
                  </span>{" "}
                  will bring your order soon.
                </>
              ) : (
                "Your order will arrive shortly."
              )}
            </p>
            <div className="divide-y divide-gray-200 text-left max-h-[50vh] overflow-y-auto rounded-md bg-gray-50 p-2">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-green-50 p-3 rounded-md">
              <p className="flex justify-between text-sm font-semibold text-green-700">
                <span>Total</span>
                <span>{formattedTotal()}</span>
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  // ✅ Order Summary Modal
  return (
    <Modal isOpen={isSummaryModalOpen()} onClose={handleClose}>
      <div className="w-[340px] max-w-[92vw] p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="p-4 border-b border-gray-100 text-center">
            <h2 className="text-base font-bold text-gray-900">Order Summary</h2>
            <p className="text-xs text-gray-500">
              {selectedItems.length}{" "}
              {selectedItems.length === 1 ? "item" : "items"} in cart
            </p>
          </div>

          <div className="p-3 max-h-[50vh] overflow-y-auto space-y-2">
            {unavailableItems.length > 0 && (
              <div className="p-2 bg-red-50 border border-red-200 rounded-md text-red-600 text-xs text-center font-medium">
                Some items are unavailable
              </div>
            )}

            {selectedItems.map((item) => {
              const isUnavailable = unavailableItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-2 rounded-lg border ${
                    isUnavailable
                      ? "bg-red-50 border-red-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 truncate">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      x{item.quantity}
                      {isUnavailable && (
                        <span className="ml-2 text-red-600 font-medium">
                          Unavailable
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        setUnavailableItems([]);
                      }}
                      className="p-1 text-gray-400 hover:text-red-500 rounded-full"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t border-gray-100 space-y-3">
            <div className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
              <span className="text-sm font-medium text-gray-700">Total</span>
              <span className="text-base font-bold text-gray-900">
                {formattedTotal()}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleClose}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isPending || isLoading}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 disabled:bg-blue-400 transition"
              >
                {isPending || isLoading ? "Processing..." : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
