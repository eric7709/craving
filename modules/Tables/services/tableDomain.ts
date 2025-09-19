import { validateNumber } from "@/global/utils/validateNumber";
import { validateString } from "@/global/utils/validateString";
import { nanoid } from "nanoid";
import {
  TCreateTable,
  TUpdateTable,
  TTable,
  TTableError,
  TAllocationFilter,
  TWaiter,
} from "../types/table";

export class TableDomain {
  // ===========================
  // ✅ Utilities
  // ===========================
  static generateTableUrl(): string {
    return nanoid(8);
  }

  static getTableDisplayName(name: string, tableNumber: number): string {
    return `${name} (Table ${tableNumber})`;
  }

  static getCapacityLabel(capacity: number): string {
    return `${capacity} ${capacity === 1 ? "person" : "people"}`;
  }

  static getAvailabilityStatus(isAvailable: boolean): string {
    return isAvailable ? "Available" : "Occupied";
  }

  static getWaiterFullName(
    waiter: { firstname: string; lastname: string } | null
  ): string {
    if (!waiter) return "No waiter assigned";
    return `${waiter.firstname} ${waiter.lastname}`;
  }

  static fillTableFields(table: TTable) {
    return {
      id: table.id,
      name: table.name,
      capacity: table.capacity,
      tableNumber: table.tableNumber,
      waiterId: table.waiter?.id || null
    };
  }

  static canAddTable(newTable: TTable, allTables: TTable[]): boolean {
    return !allTables.some(
      (t) =>
        t.tableNumber === newTable.tableNumber ||
        t.name.toLowerCase() === newTable.name.toLowerCase()
    );
  }

  static addTable(newTable: TTable, allTables: TTable[]): TTable[] {
    if (!this.canAddTable(newTable, allTables)) return allTables;
    return [...allTables, newTable];
  }

  static updateTable(updated: TTable, allTables: TTable[]): TTable[] {
    return allTables.map((t) =>
      t.id === updated.id ? { ...t, ...updated } : t
    );
  }

  static deleteTable(id: string, allTables: TTable[]): TTable[] {
    return allTables.filter((t) => t.id !== id);
  }
  static filterTables(
    tables: TTable[],
    searchTerm: string,
    sortBy: string
    // allocatedFilter: TAllocationFilter
  ): TTable[] {
    let filtered = [...tables];

    if (searchTerm?.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (table) =>
          table.name.toLowerCase().includes(term) ||
          table.tableNumber.toString().includes(term) ||
          (table.waiter &&
            `${table.waiter?.firstname} ${table.waiter?.lastname}`
              .toLowerCase()
              .includes(term))
      );
    }

    // if (allocationFilter === "allocated") {
    //   filtered = filtered.filter((table) => !!table.waiter);
    // } else if (allocationFilter === "unallocated") {
    //   filtered = filtered.filter((table) => !table.waiter);
    // }

    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "nameAsc":
            return a.name.localeCompare(b.name);
          case "nameDesc":
            return b.name.localeCompare(a.name);
          case "numberAsc":
            return a.tableNumber - b.tableNumber;
          case "numberDesc":
            return b.tableNumber - a.tableNumber;
          case "capacityAsc":
            return a.capacity - b.capacity;
          case "capacityDesc":
            return b.capacity - a.capacity;
          case "availabilityAsc":
            return Number(a.isAvailable) - Number(b.isAvailable);
          case "availabilityDesc":
            return Number(b.isAvailable) - Number(a.isAvailable);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }

  static transformTable(row: any): TTable {
    return {
      id: row.id,
      name: row.name,
      tableNumber: row.table_number,
      capacity: row.capacity,
      isAvailable: row.is_available,
      url: row.url,
      createdAt: row.created_at, // ⚠️ requires column in DB
      waiter: row.waiter
        ? ({
            id: row.waiter.id,
            firstname: row.waiter.firstname,
            lastname: row.waiter.lastname,
            email: row.waiter.email,
            phoneNumber: row.waiter.phone_number,
            gender: row.waiter.gender,
            role: row.waiter.role,
            isActive: row.waiter.is_active,
            createdAt: row.waiter.created_at,
            registeredBy: row.waiter.registered_by,
            authUserId: row.waiter.auth_user_id,
          } as TWaiter)
        : (null as any), // or undefined if waiter is optional
    };
  }

  static transformTables(rows: any[]): TTable[] {
    return (rows || []).map((row) => this.transformTable(row));
  }

  static getTableStats(tables: TTable[]) {
    const total = tables.length;
    const available = tables.filter((t) => t.isAvailable).length;
    const occupied = total - available;
    const totalCapacity = tables.reduce((sum, t) => sum + t.capacity, 0);
    return {
      total,
      available,
      occupied,
      totalCapacity,
      occupancyRate: total > 0 ? Math.round((occupied / total) * 100) : 0,
    };
  }

  static getTablesByAvailability(tables: TTable[]) {
    return {
      available: tables.filter((t) => t.isAvailable),
      occupied: tables.filter((t) => !t.isAvailable),
    };
  }

  static getTablesByWaiter(tables: TTable[]) {
    const grouped = tables.reduce((acc, table) => {
      const waiterId = table.waiter?.id || "unassigned";
      if (!acc[waiterId]) acc[waiterId] = [];
      acc[waiterId].push(table);
      return acc;
    }, {} as Record<string, TTable[]>);
    return grouped;
  }

  static getTableById(tables: TTable[], tableId: string) {
    return tables.find((el) => el.id == tableId);
  }

  // ===========================
  // ✅ Duplicate Check
  // ===========================
  // ===========================
  // ✅ Fixed Duplicate Check Methods
  // ===========================

  static hasDuplicateCreate(
    tables: TTable[],
    tableName: string,
    tableNumber: number
  ): { duplicateNumber: boolean; duplicateName: boolean } {
    const numericTableNumber =
      typeof tableNumber === "string" ? parseInt(tableNumber, 10) : tableNumber;
    const duplicateNumber = tables.some(
      (t) => t.tableNumber === numericTableNumber
    );
    const duplicateName = tables.some(
      (t) => t.name.toLowerCase().trim() === tableName.toLowerCase().trim()
    );

    return { duplicateNumber, duplicateName };
  }

  static hasDuplicateUpdate(
    tables: TTable[],
    table: TUpdateTable
  ): { duplicateNumber: boolean; duplicateName: boolean } {
    const number = table.tableNumber;
    const name = table.name?.trim();

    // Check for duplicate number (exclude current table)
    const duplicateNumber =
      number !== undefined
        ? tables.some(
            (t) =>
              t.tableNumber ===
                (typeof number === "string" ? parseInt(number, 10) : number) &&
              t.id !== table.id
          )
        : false;

    // Check for duplicate name (exclude current table)
    const duplicateName = name
      ? tables.some(
          (t) =>
            t.name.toLowerCase().trim() === name.toLowerCase() &&
            t.id !== table.id
        )
      : false;

    return { duplicateNumber, duplicateName };
  }

  // ===========================
  // ✅ Validation
  // ===========================
  static validateNewTable(table: TCreateTable, tables: TTable[]) {
    const errors: Partial<TTableError> = {};
    const processedData = { ...table, url: this.generateTableUrl() };

    const isNameValid = validateString(table.name, "Table Name");
    const isNumberValid = validateNumber(table.tableNumber, "Table Number");
    const isCapacityValid = validateNumber(table.capacity, "Capacity");

    if (!isNameValid.isValid) errors.name = isNameValid.error;
    if (!isNumberValid.isValid) errors.tableNumber = isNumberValid.error;
    if (!isCapacityValid.isValid) errors.capacity = isCapacityValid.error;
    const { duplicateNumber, duplicateName } = this.hasDuplicateCreate(
      tables,
      table.name,
      table.tableNumber
    );
    if (duplicateNumber) errors.tableNumber = "Table number already exists";
    if (duplicateName) errors.name = "Table name already exists";

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
      data: processedData,
    };
  }

  static validateUpdateTable(table: TUpdateTable, tables: TTable[]) {
    const errors: Partial<TTableError> = {};

    const isIdValid = validateString(table.id, "Table Id");
    const isNameValid = validateString(table.name, "Table Name");
    const isNumberValid = validateNumber(table.tableNumber, "Table Number");
    const isCapacityValid = validateNumber(table.capacity, "Capacity");

    if (!isIdValid.isValid) errors.id = isIdValid.error;
    if (!isNameValid.isValid) errors.name = isNameValid.error;
    if (!isNumberValid.isValid) errors.tableNumber = isNumberValid.error;
    if (!isCapacityValid.isValid) errors.capacity = isCapacityValid.error;

    const { duplicateNumber, duplicateName } = this.hasDuplicateUpdate(
      tables,
      table
    );
    if (duplicateNumber) errors.tableNumber = "Table number already exists";
    if (duplicateName) errors.name = "Table name already exists";

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
      data: table,
    };
  }
}
