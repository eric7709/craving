import {
  TCreateCustomer,
  TUpdateCustomer,
  TCustomerError,
  TCustomer,
} from "../types/customer";
import { validateEmail } from "@/global/utils/validateEmail";
import { validatePhoneNumber } from "@/global/utils/validatePhoneNumber";

export type TCustomerData = {
  id: string
  phoneNumber?: string;
  email: string;
  name: string;
};

export class CustomerDomain {
  private static STORAGE_KEY = "cravings_info";
  static validateNewCustomer(data: TCreateCustomer) {
    const errors: Partial<TCustomerError> = {};
    const phone = validatePhoneNumber(data.phoneNumber ?? "");
    if (data.phoneNumber && !phone.isValid) errors.phoneNumber = phone.error;
    const email = validateEmail(data.email);
    if (!email.isValid) errors.email = email.error;
    if (!data.name?.trim()) errors.name = "Name is required";
    return { errors, isValid: Object.keys(errors).length === 0 };
  }

  static validateUpdateCustomer(data: TUpdateCustomer) {
    const errors: Partial<TCustomerError> = {};
    if (!data.id) {
      errors.general = "Customer ID is required for updates.";
    }
    if (data.phoneNumber !== undefined) {
      const phone = validatePhoneNumber(data.phoneNumber ?? "");
      if (!phone.isValid) errors.phoneNumber = phone.error;
    }
    if (data.email !== undefined) {
      const email = validateEmail(data.email);
      if (!email.isValid) errors.email = email.error;
    }
    if (data.name !== undefined && !data.name.trim()) {
      errors.name = "Name is required";
    }
    return { errors, isValid: Object.keys(errors).length === 0 };
  }
  static setCustomerForUpdate(customer: TCustomer | null) {
    return {
      name: customer?.name ?? "",
      id: customer?.id ?? "",
      email: customer?.email ?? "",
      phoneNumber: customer?.phoneNumber ?? "",
    };
  }
  static getFullName(firstName: string, lastName: string) {
    return `${firstName} ${lastName}`;
  }
  static filterCustomers(
    customers: TCustomer[],
    searchTerm: string,
    sortBy: string
  ): TCustomer[] {
    let filtered = [...customers];
    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "nameAsc") return a.name.localeCompare(b.name);
        if (sortBy === "nameDesc") return b.name.localeCompare(a.name);
        if (sortBy === "emailAsc") return a.email.localeCompare(b.email);
        if (sortBy === "emailDesc") return b.email.localeCompare(a.email);
        return 0;
      });
    }
    return filtered;
  }

  static encodeCustomer(data: TCustomerData): string {
    const json = JSON.stringify(data);
    return btoa(json);
  }
  static decodeCustomer(encoded: string): TCustomerData | null {
    try {
      const json = atob(encoded);
      return JSON.parse(json);
    } catch {
      return null;
    }
  }
  static saveCustomer(data: TCustomerData): void {
    const encoded = this.encodeCustomer(data);
    localStorage.setItem(this.STORAGE_KEY, encoded);
  }
  static getCustomer(): TCustomerData | null {
    const encoded = localStorage.getItem(this.STORAGE_KEY);
    if (!encoded) return null;
    return this.decodeCustomer(encoded);
  }
  static clearCustomer(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
