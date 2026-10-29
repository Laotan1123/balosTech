import { randomUUID } from "crypto";
import { Condition } from "@prisma/client";
import { PrismaService } from "../../prisma.service";
import { ProductQueryDto } from "./products.dto";
import { ProductsService } from "./products.service";

const describeIfDatabase = process.env.RUN_DB_INTEGRATION === "true" ? describe : describe.skip;

describeIfDatabase("ProductsService database integration", () => {
  const slug = `ci-product-${randomUUID()}`;
  const brand = `CI-${slug}`;
  let prisma: PrismaService | undefined;
  let service: ProductsService;

  beforeAll(async () => {
    prisma = new PrismaService();
    await prisma.$connect();
    service = new ProductsService(prisma);
    await prisma.product.create({
      data: {
        slug,
        name: "CI integration phone",
        brand,
        description: "Product used by the database integration test.",
        specs: [],
        condition: Condition.New,
        priceKobo: 123_456,
        images: [],
        tags: [],
        inStock: true
      }
    });
  });

  afterAll(async () => {
    if (!prisma) {
      return;
    }

    await prisma.product.deleteMany({ where: { slug } });
    await prisma.$disconnect();
  });

  it("queries persisted products with catalog filters", async () => {
    const query: ProductQueryDto = {
      brand,
      min: "1200",
      max: "1300",
      page: "1"
    };

    const result = await service.list(query);

    expect(result.total).toBe(1);
    expect(result.products).toEqual(
      expect.arrayContaining([expect.objectContaining({ slug, brand })])
    );
  });
});
