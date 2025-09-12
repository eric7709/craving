import {
  TEmployee,
  TCreateEmployee,
  TUpdateEmployee,
  TEmployeeError,
  TEmployeeDB,
  TRole,
} from "../types/employee";
import { validateEmail } from "@/global/utils/validateEmail";
import { validatePhoneNumber } from "@/global/utils/validatePhoneNumber";

export class EmployeeDomain {
  // ===========================
  // ✅ Transform Functions
  // ===========================
  static transformEmployee(db: TEmployeeDB): TEmployee {
    return {
      id: db.id,
      firstname: db.firstname,
      lastname: db.lastname,
      email: db.email,
      phoneNumber: db.phone_number,
      gender: db.gender ?? undefined,
      role: db.role,
      isActive: db.is_active,
      createdAt: db.created_at ?? undefined,
    };
  }

  static toDB(app: TEmployee): TEmployeeDB {
    return {
      id: app.id,
      firstname: app.firstname,
      lastname: app.lastname,
      email: app.email,
      phone_number: app.phoneNumber ?? "",
      gender: app.gender,
      role: app.role,
      is_active: app.isActive,
      created_at: app.createdAt,
    };
  }

  // ===========================
  // ✅ Validation
  // ===========================
  static validateNewEmployee(data: TCreateEmployee) {
    const errors: Partial<TEmployeeError> = {};
    if (!data.firstname?.trim()) errors.firstname = "First name is required";
    if (!data.lastname?.trim()) errors.lastname = "Last name is required";
    if (!data.role?.trim()) errors.role = "Role is required";
    if (!data.gender?.trim()) errors.gender = "Gender is required"; // ✅ Added
    const email = validateEmail(data.email);
    if (!email.isValid) errors.email = email.error;
    if (data.phoneNumber) {
      const phone = validatePhoneNumber(data.phoneNumber);
      if (!phone.isValid) errors.phoneNumber = phone.error;
    }
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
      data: {
        ...data,
        password: this.generatePassword(data.firstname),
        role: data.role as TRole,
      },
    };
  }

  static validateUpdateEmployee(data: TUpdateEmployee) {
    const errors: Partial<TEmployeeError> = {};
    if (!data.id) errors.general = "Employee ID is required for updates.";
    if (data.firstname !== undefined && !data.firstname.trim()) {
      errors.firstname = "First name is required";
    }
    if (data.lastname !== undefined && !data.lastname.trim()) {
      errors.lastname = "Last name is required";
    }
    if (data.email !== undefined) {
      const email = validateEmail(data.email);
      if (!email.isValid) errors.email = email.error;
    }

    if (data.phoneNumber !== undefined) {
      const phone = validatePhoneNumber(data.phoneNumber);
      if (!phone.isValid) errors.phoneNumber = phone.error;
    }

    if (data.role !== undefined && !data.role.trim()) {
      errors.role = "Role is required";
    }
    return { errors, data, isValid: Object.keys(errors).length === 0 };
  }

  // ===========================
  // ✅ Utilities
  // ===========================
  static getFullName(firstname: string, lastname: string) {
    return `${firstname} ${lastname}`.trim();
  }

  static setEmployeeForUpdate(employee: TEmployee | null) {
    return {
      id: employee?.id ?? "",
      firstname: employee?.firstname ?? "",
      lastname: employee?.lastname ?? "",
      email: employee?.email ?? "",
      phoneNumber: employee?.phoneNumber ?? "",
      gender: employee?.gender ?? "",
      role: employee?.role ?? "",
      isActive: employee?.isActive ?? true,
    };
  }

  // ===========================
  // ✅ Password Generator
  // ===========================
  static generatePassword(firstname: string): string {
    const cleanName = firstname.trim().toLowerCase();
    const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    // Pick 2 random digits
    const numbers = Math.floor(10 + Math.random() * 90); // ensures 2 digits (10–99)
    // Choose a random special character
    const specialChars = "!@#$%^&*";
    const special =
      specialChars[Math.floor(Math.random() * specialChars.length)];
    // Example format: John42!
    return `${capitalized}${numbers}${special}`;
  }

  static filterEmployees(
    employees: TEmployee[],
    searchTerm: string,
    sortBy: string
  ): TEmployee[] {
    let filtered = [...employees];

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          this.getFullName(e.firstname, e.lastname)
            .toLowerCase()
            .includes(lower) ||
          e.email.toLowerCase().includes(lower) ||
          e.role?.toLowerCase().includes(lower)
      );
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "nameAsc")
          return this.getFullName(a.firstname, a.lastname).localeCompare(
            this.getFullName(b.firstname, b.lastname)
          );
        if (sortBy === "nameDesc")
          return this.getFullName(b.firstname, b.lastname).localeCompare(
            this.getFullName(a.firstname, a.lastname)
          );
        if (sortBy === "emailAsc") return a.email.localeCompare(b.email);
        if (sortBy === "emailDesc") return b.email.localeCompare(a.email);
        if (sortBy === "roleAsc")
          return (a.role ?? "").localeCompare(b.role ?? "");
        if (sortBy === "roleDesc")
          return (b.role ?? "").localeCompare(a.role ?? "");
        return 0;
      });
    }

    return filtered;
  }
}
