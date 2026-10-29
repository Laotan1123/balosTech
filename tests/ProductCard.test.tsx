import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "@/components/ProductCard";
import type { ProductDTO } from "@/lib/api-contracts";

const addItemMock = jest.fn();
const addToastMock = jest.fn();

jest.mock("@/lib/cart", () => ({
  useCart: () => ({ addItem: addItemMock })
}));

jest.mock("@/components/ToastProvider", () => ({
  useToast: () => ({ addToast: addToastMock })
}));

const product: ProductDTO = {
  id: "1",
  slug: "test-phone",
  name: "Test Phone",
  brand: "TestBrand",
  description: "A great phone",
  specs: ["Spec1", "Spec2", "Spec3"],
  condition: "New",
  priceKobo: 5000000,
  images: ["https://images.unsplash.com/photo-1677041348948-7164ae4d2626"],
  inStock: true
};

describe("ProductCard", () => {
  it("renders product details and handles add to cart", async () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("Test Phone")).toBeInTheDocument();
    expect(screen.getByText("TestBrand")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /add .* to cart/i }));
    expect(addItemMock).toHaveBeenCalledTimes(1);
    expect(addToastMock).toHaveBeenCalledTimes(1);
  });
});
