import {
  TCreateEmployee,
  TUpdateEmployee,
  TEmployeeError,
} from "../types/employee";

export const createEmployeeInitials: TCreateEmployee = {
  firstname: "",
  lastname: "",
  email: "",
  role: "", 
  gender: "", 
  phoneNumber: "",
  isActive: false,
};

export const updateEmployeeInitials: TUpdateEmployee = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  role: "",
};

export const employeeErrorInitials: TEmployeeError = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  role: "",
  general: "",
};
