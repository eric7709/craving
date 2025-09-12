import { validateString } from "@/global/utils/validateString";
import { validateNumber } from "@/global/utils/validateNumber";
import {
  TCreateMenuItem,
  TMenuItem,
  TMenuItemErrors,
  TUpdateMenuItem,
} from "../types/menuItem";

export class MenuItemDomain {
  static transformMenuItem(data: any): TMenuItem {
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      description: data.description,
      categoryId: data.category_id,
      category: {
        id: data.category?.id,
        name: data.category?.name,
      },
      imageUrl: data.image_url,
      isAvailable: data.is_available,
      ingredients: data.ingredients,
    };
  }

  static setUpdateForm(menuItem: TMenuItem): TUpdateMenuItem | null {
    if (menuItem.categoryId) {
      return {
        categoryId: menuItem.categoryId ?? "",
        id: menuItem.id,
        description: menuItem.description ?? "",
        isAvailable: menuItem.isAvailable,
        name: menuItem.name ?? "",
        price: menuItem.price ?? "",
        imageUrl: menuItem.imageUrl ?? "",
        image: menuItem.imageUrl ?? null,
      };
    }
    return null;
  }

  static validateCreateMenuItem(menuItem: TCreateMenuItem) {
    const errors: TMenuItemErrors = {};
    const nameValidation = validateString(menuItem.name, "Name");
    if (!nameValidation.isValid) errors.name = nameValidation.error;
    const priceValidation = validateNumber(menuItem.price, "Price");
    if (!priceValidation.isValid) errors.price = priceValidation.error;
    const descriptionValidation = validateString(
      menuItem.description,
      "Description"
    );
    if (!descriptionValidation.isValid)
      errors.description = descriptionValidation.error;
    const categoryValidation = validateString(menuItem.categoryId, "Category");
    if (!categoryValidation.isValid)
      errors.categoryId = categoryValidation.error;
    // Optional imageUrl
    if (menuItem.imageUrl) {
      const imageUrlValidation = validateString(menuItem.imageUrl, "Image URL");
      if (!imageUrlValidation.isValid)
        errors.imageUrl = imageUrlValidation.error;
    }
    // Optional ingredients array
    if (menuItem.ingredients && menuItem.ingredients.length > 0) {
      menuItem.ingredients.forEach((ing, idx) => {
        const ingValidation = validateString(ing, `Ingredient #${idx + 1}`);
        if (!ingValidation.isValid && !errors.ingredients) {
          errors.ingredients = ingValidation.error;
        }
      });
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  // Update validation (all fields required including id)
  static validateUpdateMenuItem(menuItem: TUpdateMenuItem) {
    const errors: TMenuItemErrors = {};
    const idValidation = validateString(menuItem.id, "ID");
    if (!idValidation.isValid) errors.id = idValidation.error;
    const nameValidation = validateString(menuItem.name, "Name");
    if (!nameValidation.isValid) errors.name = nameValidation.error;
    const priceValidation = validateNumber(menuItem.price, "Price");
    if (!priceValidation.isValid) errors.price = priceValidation.error;
    const descriptionValidation = validateString(
      menuItem.description,
      "Description"
    );
    if (!descriptionValidation.isValid)
      errors.description = descriptionValidation.error;
    const categoryValidation = validateString(menuItem.categoryId, "Category");
    if (!categoryValidation.isValid)
      errors.categoryId = categoryValidation.error;
    if (menuItem.imageUrl) {
      const imageUrlValidation = validateString(menuItem.imageUrl, "Image URL");
      if (!imageUrlValidation.isValid)
        errors.imageUrl = imageUrlValidation.error;
    }
    if (menuItem.ingredients && menuItem.ingredients.length > 0) {
      menuItem.ingredients.forEach((ing, idx) => {
        const ingValidation = validateString(ing, `Ingredient #${idx + 1}`);
        if (!ingValidation.isValid && !errors.ingredients) {
          errors.ingredients = ingValidation.error;
        }
      });
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
