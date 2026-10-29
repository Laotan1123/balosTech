import { validate } from "class-validator";
import { ProductQueryDto } from "./products.dto";

describe("ProductQueryDto", () => {
  it("rejects unsupported conditions and non-numeric pagination values", async () => {
    const query = Object.assign(new ProductQueryDto(), {
      condition: "Damaged",
      page: "first"
    });

    const errors = await validate(query);

    expect(errors.map((error) => error.property)).toEqual(
      expect.arrayContaining(["condition", "page"])
    );
  });
});
