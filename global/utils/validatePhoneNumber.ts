export function validatePhoneNumber(phone: string | null): {
  isValid: boolean;
  error: string;
} {
  if (!phone || phone.trim() === "") {
    return { isValid: false, error: "Phone number is required" };
  }

  const cleaned = phone.replace(/\s+/g, ""); // remove spaces
  const localRegex = /^0\d{7,14}$/;          // local numbers starting with 0
  const intlRegex = /^\+?[1-9]\d{7,14}$/;    // international format

  if (!localRegex.test(cleaned) && !intlRegex.test(cleaned)) {
    return { isValid: false, error: "Invalid phone number format." };
  }

  return { isValid: true, error: "" };
}
