import { TCreateTable, TUpdateTable, TTableError } from "../types/table";

export const createTableInitials: TCreateTable = {
  name: "",
  tableNumber: 0,
  capacity: 1,
  isAvailable: true,
  waiterId: null,
  url: null,
};

export const updateTableInitials: TUpdateTable = {
  id: "",
  name: "",
  tableNumber: 0,
  capacity: 1,
  isAvailable: true,
  waiterId: "",
  url: null,
};


export const tableErrorInitials: TTableError = {
  id: "",
  name: "",
  tableNumber: "",
  capacity: "",
  isAvailable: "",
  waiterId: "",
  url: "",
  general: "",
};