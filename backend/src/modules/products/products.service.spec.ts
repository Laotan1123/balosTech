import { NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { Condition, ProductQueryDto } from "./products.dto";
import { ProductsService } from "./products.service";

describe("ProductsService", () => {
  const prisma = {
    product: {
      count: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn()
    }
  };
  let service: ProductsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProductsService(prisma as unknown as PrismaService);
  });

  it("applies catalog filters, price conversion, and pagination", async () => {
    const products = [{ id: "product-1", slug: "phone" }];
    prisma.product.count.mockResolvedValue(9);
    prisma.product.findMany.mockResolvedValue(products);
    const query: ProductQueryDto = {
      search: "  phone  ",
      brand: "Apple",
      condition: Condition.NEW,
      min: "100000",
      max: "500000",
      page: "2"
    };

    await expect(service.list(query)).resolves.toEqual({ products, total: 9 });
    const where = {
      OR: [
        { name: { contains: "phone", mode: "insensitive" } },
        { brand: { contains: "phone", mode: "insensitive" } },
        { description: { contains: "phone", mode: "insensitive" } }
      ],
      brand: { equals: "Apple", mode: "insensitive" },
      condition: Condition.NEW,
      priceKobo: { gte: 10_000_000, lte: 50_000_000 },
      inStock: true
    };
    expect(prisma.product.count).toHaveBeenCalledWith({ where });
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where,
      orderBy: { createdAt: "desc" },
      skip: 6,
      take: 6
    });
  });

  it("returns a product by slug", async () => {
    const product = { id: "product-1", slug: "phone" };
    prisma.product.findUnique.mockResolvedValue(product);

    await expect(service.findOne("phone")).resolves.toEqual({ product });
    expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { slug: "phone" } });
  });

  it("throws when the product slug does not exist", async () => {
    prisma.product.findUnique.mockResolvedValue(null);

    await expect(service.findOne("missing")).rejects.toThrow(NotFoundException);
  });
});
