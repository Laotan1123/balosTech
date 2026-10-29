export function formatNGN(amountInKobo: number): string {
  const naira = amountInKobo / 100;
  return naira.toLocaleString("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 });
}

export function normalizePhoneNumberToPlus234(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("234")) return `+${digits}`;
  if (digits.startsWith("0")) return `+234${digits.slice(1)}`;
  if (digits.startsWith("2340")) return `+${digits.replace(/^2340/, "234")}`;
  return digits.startsWith("+234") ? digits : `+234${digits}`;
}
