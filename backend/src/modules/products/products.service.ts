import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma.service";
import { ProductQueryDto } from "./products.dto";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ProductQueryDto) {
    const page = Number(query.page ?? 1);
    const pageSize = 6;
    const term = (query.search ?? "").trim();
    const min = query.min ? Number(query.min) * 100 : 0;
    const max = query.max ? Number(query.max) * 100 : Number.MAX_SAFE_INTEGER;

    const where: Prisma.ProductWhereInput = {
      ...(term
        ? {
            OR: [
              { name: { contains: term, mode: "insensitive" } },
              { brand: { contains: term, mode: "insensitive" } },
              { description: { contains: term, mode: "insensitive" } }
            ]
          }
        : {}),
      ...(query.brand
        ? { brand: { equals: query.brand, mode: "insensitive" as const } }
        : {}),
      ...(query.condition ? { condition: query.condition } : {}),
      priceKobo: {
        gte: min,
        lte: max
      },
      inStock: true
    };

    const [total, products] = await Promise.all([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize
      })
    ]);

    return { products, total };
  }

  async findOne(slug: string) {
    const product = await this.prisma.product.findUnique({ where: { slug } });

    if (!product) {
      throw new NotFoundException(`Product with slug "${slug}" was not found.`);
    }

    return { product };
  }
}
