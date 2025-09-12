export function validateString(
  value: string | number | null | undefined,
  title: string
): { isValid: boolean; error: string | undefined } {
  if (typeof value == "string") {
    if (!value || value == null || !value.trim() || value == undefined) {
      return {
        isValid: false,
        error: `${title} is required`,
      };
    } else {
      return {
        isValid: true,
        error: undefined,
      };
    }
  }
  return {
    isValid: false,
    error: `${title} is must be a string`,
  };
}
