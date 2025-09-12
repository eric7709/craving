import { validateString } from "@/global/utils/validateString";
import { TCategory, TCategoryError } from "../types/category";

export class CategoryDomain {
  /** 🔹 Validate category name for creation */
  static validateCreateCategory(name: string) {
    const errors: TCategoryError = {};
    const isCategoryNameValid = validateString(name, "Category name");
    if (!isCategoryNameValid.isValid) errors.name = isCategoryNameValid.error;

    return {
      isValid: isCategoryNameValid.isValid,
      errors,
    };
  }

  /** 🔹 Validate category name for update */
  static validateUpdateCategory(name: string, id?: string) {
    const errors: TCategoryError = {};
    const isCategoryNameValid = validateString(name, "Category name");
    const isCategoryIdValid = validateString(id, "Category Id");
    if (!isCategoryNameValid.isValid) errors.name = isCategoryNameValid.error;
    if (!isCategoryIdValid.isValid) errors.id = isCategoryIdValid.error;

    return {
      isValid: isCategoryNameValid.isValid && isCategoryIdValid.isValid,
      errors,
    };
  }

  static hasDuplicateCreate(name: string, categories: TCategory[]): boolean {
    const lowerName = name.toLowerCase();
    return categories.some((cat) => cat.name.toLowerCase() === lowerName);
  }
  static hasDuplicateUpdate(name: string, id: string, categories: TCategory[]): boolean {
    const lowerName = name.toLowerCase();
    return categories.some((cat) => cat.name.toLowerCase() === lowerName && cat.id !== id);
  }
}
