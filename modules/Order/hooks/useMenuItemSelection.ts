import { useMenuItemDataStore } from "@/modules/MenuItem/store/useMenuItemDataStore";
import { useEffect, useState, useCallback, useMemo } from "react";
import { TMenuItemsWithQtyAndTakeOut } from "../types/order";
import { formatPrice } from "@/global/utils/formatPrice";

export const useMenuItemSelection = () => {
  const { menuItems: menuItemsData, isLoading } = useMenuItemDataStore();
  const [allMenuItems, setAllMenuItems] = useState<
    TMenuItemsWithQtyAndTakeOut[]
  >([]);
  const [menuItems, setMenuItems] = useState<TMenuItemsWithQtyAndTakeOut[]>([]);
  const [selectedMenuItems, setSelectedMenuItems] = useState<
    TMenuItemsWithQtyAndTakeOut[]
  >([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const filter = useCallback(() => {
    const filtered = allMenuItems.filter((el) => {
      const matchesSearch =
        el.name.trim().toLowerCase().includes(search.trim().toLowerCase()) ||
        el.description
          .trim()
          .toLowerCase()
          .includes(search.trim().toLowerCase());
      const matchesCategory =
        category === "all" ||
        el.category.name.trim().toLowerCase() === category.trim().toLowerCase();
      return matchesSearch && matchesCategory;
    });
    setMenuItems(filtered);
  }, [allMenuItems, search, category]);

  useEffect(() => {
    filter();
  }, [filter]);

  useEffect(() => {
    if (!isLoading && menuItemsData) {
      const initialized = menuItemsData.map((el) => ({
        ...el,
        takeOut: false,
        quantity: 0,
      }));
      setAllMenuItems(initialized);
      setMenuItems(initialized);
    }
  }, [menuItemsData, isLoading]);

  const updateSelectedMenuItems = useCallback(() => {
    const selected = allMenuItems.filter((el) => el.quantity > 0);
    setSelectedMenuItems(selected);
  }, [allMenuItems]);
  const reset = useCallback(() => {
    setSelectedMenuItems(allMenuItems);
  }, [allMenuItems, selectedMenuItems]);

  const increaseQty = (id: string) => {
    setAllMenuItems((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, quantity: el.quantity + 1 } : el
      )
    );
  };
  const removeFromCart = (id: string) => {
    setAllMenuItems((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, quantity: 0, takeOut: false } : el
      )
    );
  };
  const decreaseQty = (id: string) => {
    setAllMenuItems((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
              ...el,
              quantity: el.quantity > 0 ? el.quantity - 1 : 0,
              takeOut: el.quantity == 0 ? false : el.takeOut,
            }
          : el
      )
    );
  };
  const toggleTakeOut = (id: string) => {
    setAllMenuItems((prev) =>
      prev.map((el) => (el.id === id ? { ...el, takeOut: !el.takeOut } : el))
    );
  };
  useEffect(() => {
    updateSelectedMenuItems();
  }, [allMenuItems, updateSelectedMenuItems]);
  const totalPrice = useMemo(() => {
    return selectedMenuItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  }, [selectedMenuItems]);
  const totalPriceFormatted = useMemo(
    () => formatPrice(totalPrice),
    [totalPrice]
  );
  return {
    search,
    setSearch,
    category,
    setCategory,
    menuItems,
    selectedMenuItems,
    increaseQty,
    removeFromCart,
    reset,
    decreaseQty,
    toggleTakeOut,
    totalPrice,
    totalPriceFormatted,
  };
};
