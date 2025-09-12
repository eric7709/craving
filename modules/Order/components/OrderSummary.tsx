"use client";

import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Modal from "@/global/components/Modal";
import { useOrderUtilStore } from "../store/useOrderUtilStore";
import { formatPrice } from "@/global/utils/formatPrice";
import { useCreateOrder } from "../hooks/useOrderServices";
import { CustomerDomain } from "@/modules/Customer/services/customerDomain";
import {  getUnavailableMenuItems } from "@/app/actions/menuItemActions";
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

  // Close modal if no items
  useEffect(() => {
    if (selectedItems.length === 0) closeModal();
  }, [selectedItems, closeModal]);

  // Reset unavailable items when active modal changes or items change
  useEffect(() => {
    setUnavailableItems([]);
  }, [activeModal, selectedItems]);

  // Remove unavailable items from cart if menu changes
  useEffect(() => {
    menuItems.forEach((el) => {
      if (!el.isAvailable && existsInCart(el.id) && !activeModal) {
        removeFromCart(el.id);
      }
    });
  }, [menuItems, existsInCart, activeModal, removeFromCart]);

  const handleConfirm = async () => {
    if (!selectedTable) {
      alert("Please select a table first");
      return;
    }
    if (!selectedTable.waiter) {
      alert("No waiter assigned to this table");
      return;
    }

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
          items: selectedItems.map(
            ({ id, name, price, quantity, takeOut }) => ({
              id,
              name,
              price,
              quantity,
              takeOut,
            })
          ),
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

  useEffect(() => {
    if (error) {
      console.error("Order creation failed:", error);
      alert("Failed to create order. Please try again.");
      setIsLoading(false);
    }
  }, [error]);

  const handleClose = () => {
    if (orderSuccess) clearSelectedItem();
    setUnavailableItems([]);
    setOrderSuccess(false);
    closeModal();
  };

  // --- Success Modal ---
  if (orderSuccess) {
    return (
      <Modal isOpen={orderSuccess} onClose={handleClose}>
        <div className="w-[300px] max-w-[90vw] p-5 overflow-y-auto">
          <div className="bg-white p-3 text-center rounded-lg shadow-lg border border-gray-100">
            <p className="text-[10px] text-gray-500 mt-0.5">
              🍽️ Thank you,{" "}
              <span className="font-semibold inline-block mb-1 text-gray-700">
                {customerName}
              </span>
              !
              <br />
              {selectedTable?.waiter ? (
                <>
                  <span className="font-semibold text-gray-700">
                    {selectedTable.waiter.firstname}
                  </span>{" "}
                  will bring your order soon
                </>
              ) : (
                "Your order will arrive shortly"
              )}
            </p>
            <div className="p-3 max-h-[60vh] overflow-y-auto space-y-1">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-1 rounded-md border bg-gray-50 border-gray-200"
                >
                  <div className="flex-1 flex items-center gap-1 min-w-0">
                    <h3 className="text-[10px] font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-gray-700 bg-gray-200 px-1 py-0.25 rounded">
                      x{item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center ml-2 flex-shrink-0">
                    <span className="text-[10px] font-semibold text-gray-900 whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-700">Total</span>
                <span className="text-sm font-bold text-gray-900">
                  {formattedTotal()}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold text-xs flex justify-center items-center hover:bg-blue-700 transition-all"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  // --- Order Summary Modal ---
  return (
    <Modal isOpen={isSummaryModalOpen()} onClose={handleClose}>
      <div className="w-[300px] max-w-[90vw] p-3 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg border border-gray-100">
          <div className="p-3 border-b border-gray-100 text-center">
            <h2 className="text-sm font-semibold text-gray-900">Order Summary</h2>
            <p className="text-[10px] text-gray-500 mt-0.5">
              {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} selected
            </p>
          </div>
          <div className="p-3 max-h-[60vh] overflow-y-auto space-y-1">
            {unavailableItems.length > 0 && (
              <div className="mb-1 p-1 bg-red-50 border border-red-200 rounded text-red-700 text-[10px] text-center">
                {unavailableItems.length === 1 ? "The item" : "Items"} marked below {unavailableItems.length === 1 ? "is" : "are"} unavailable
              </div>
            )}
            {selectedItems.map((item) => {
              const isUnavailable = unavailableItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-1 rounded-md border transition-colors ${
                    isUnavailable
                      ? "bg-red-50 border-red-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex-1 flex items-center gap-1 min-w-0">
                    <h3 className="text-[10px] font-medium text-gray-900 truncate">{item.name}</h3>
                    <span className="text-[10px] font-semibold text-gray-700 bg-gray-200 px-1 py-0.25 rounded">x{item.quantity}</span>
                    {isUnavailable && (
                      <span className="text-[9px] font-medium text-red-600 bg-red-100 px-1 py-0.25 rounded">
                        Unavailable
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                    <span className="text-[10px] font-semibold text-gray-900 whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        setUnavailableItems([]); // Reset unavailable items on removal
                      }}
                      className="p-0.5 text-gray-400 hover:text-red-500 rounded-full"
                    >
                      <FaTrash className="w-2 h-2" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-3 border-t border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-700">Total</span>
              <span className="text-sm font-bold text-gray-900">{formattedTotal()}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleClose}
                className="flex-1 py-2 bg-red-600 text-white rounded-md font-semibold text-xs flex justify-center items-center hover:bg-red-700 transition-all"
              >
                Clear
              </button>
              <button
                onClick={handleConfirm}
                disabled={isPending || isLoading}
                className="flex-1 py-2 bg-blue-600 text-white rounded-md font-semibold text-xs flex justify-center items-center gap-1 hover:bg-blue-700 disabled:bg-blue-400 transition-all"
              >
                {isPending || isLoading ? "Creating..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
