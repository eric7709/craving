import {
  TCreateCustomer,
  TCustomerError,
  TUpdateCustomer,
} from "../types/customer";

export const createCustomerInitials: TCreateCustomer = {
  name: "",
  email: "",
  phoneNumber: "",
};

export const updateCustomerInitials: TUpdateCustomer = {
  id: "",
  name: "",
  email: "",
  phoneNumber: "",
};

export const customerErrorInitials: TCustomerError = {
  id: "",
  name: "",
  email: "",
  general: "",
  phoneNumber: "",
};
