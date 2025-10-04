"use client";
import React, { useEffect, useState } from "react";
import { useOrderUtilStore } from "../store/useOrderUtilStore";
import { useCreateOrder } from "../hooks/useOrderServices";
import { CustomerDomain } from "@/modules/Customer/services/customerDomain";
import { getUnavailableMenuItems } from "@/app/actions/menuItemActions";
import { generateOrderNumber } from "@/global/utils/generateOrderNumber";
import { useMenuItemDataStore } from "@/modules/MenuItem/store/useMenuItemDataStore";
import SuccessModal from "./SuccessModal";
import SummaryModal from "./SummaryModal";

export default function OrderSummaryModal() {
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

  const { mutate, isPending } = useCreateOrder();

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

  if (orderSuccess) {
    return (
      <SuccessModal
        customerName={customerName}
        formattedTotal={formattedTotal}
        handleClose={handleClose}
        orderSuccess={orderSuccess}
        selectedItems={selectedItems}
        selectedTable={selectedTable}
      />
    );
  }

  // ✅ Order Summary Modal
  return (
    <SummaryModal
      formattedTotal={formattedTotal}
      handleClose={handleClose}
      handleConfirm={handleConfirm}
      isLoading={isLoading}
      isPending={isPending}
      isSummaryModalOpen={isSummaryModalOpen}
      removeFromCart={removeFromCart}
      selectedItems={selectedItems}
      setUnavailableItems={setUnavailableItems}
      unavailableItems={unavailableItems}
    />
  );
}
