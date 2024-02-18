import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js";

export function whatsappNumber(phone: string): string {
  if (!isValidPhoneNumber(phone, "BR")) {
    throw new Error("Invalid phone number");
  }

  let phoneNumber = parsePhoneNumber(phone, "BR")
    ?.format("E.164")
    .replace("+", "") as string;

  phoneNumber = phoneNumber.includes("@c.us")
    ? phoneNumber
    : `${phoneNumber}@c.us`;

  return phoneNumber;
}
