import { TCreateMenuItem, TMenuItemErrors, TUpdateMenuItem } from "../types/menuItem";

export const createMenuItemInitials: TCreateMenuItem = {
  name: "",
  price: null,
  description: "",
  categoryId: "",
  image: null,
  imageUrl: "",
  isAvailable: true,
};
export const updateMenuItemInitials: TUpdateMenuItem = {
  id: "",
  name: "",
  price: null,
  description: "",
  categoryId: "",
  imageUrl: "",
  image: null,
  isAvailable: true,
};
export const menuItemErrorsInitials: TMenuItemErrors = {
  id: "",
  name: "",
  price: "",
  description: "",
  categoryId: "",
  imageUrl: "",
  isAvailable: "",
  ingredients: "",
};
