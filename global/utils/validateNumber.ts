export function validateNumber(
  value: string | number | null | undefined,
  title: string
): { isValid: boolean; error: string | undefined } {
  if (value !== undefined) {
    const newValue = Number(value);
    if (Number.isNaN(newValue)) {
      return {
        isValid: false,
        error: `${title} must be a number`,
      };
    } else if (newValue <= 0) {
      return {
        isValid: false,
        error: `${title} must be a greater than 0`,
      };
    } else if (!Number.isInteger(newValue)) {
      return {
        isValid: false,
        error: `${title} must be a whole number`,
      };
    } else {
      return {
        isValid: true,
        error: undefined,
      };
    }
  } else if (value == null) {
    return {
      isValid: false,
      error: `${title} cannot be null `,
    };
  } else {
    return {
      isValid: false,
      error: `${title} cannot be undefined `,
    };
  }
}
