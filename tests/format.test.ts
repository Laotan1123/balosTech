import { formatNGN, normalizePhoneNumberToPlus234 } from "@/lib/format";

describe("formatNGN", () => {
  it("formats kobo to NGN string", () => {
    expect(formatNGN(15_000_000)).toContain("₦150,000");
  });
});

describe("normalizePhoneNumberToPlus234", () => {
  it("normalizes leading zero", () => {
    expect(normalizePhoneNumberToPlus234("08012345678")).toBe("+2348012345678");
  });

  it("keeps +234", () => {
    expect(normalizePhoneNumberToPlus234("+2348012345678")).toBe("+2348012345678");
  });
});
