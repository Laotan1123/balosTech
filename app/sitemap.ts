import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";

export const revalidate = 0;

const PRODUCTS_PAGE_SIZE = 6;
const publicPaths = [
  "/",
  "/shop",
  "/repairs",
  "/bookings",
  "/swap",
  "/about",
  "/faq",
  "/contact",
  "/policies/privacy",
  "/policies/returns",
  "/policies/shipping",
  "/policies/terms"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const firstPage = await getProducts({ page: 1 });
  const totalPages = Math.ceil(firstPage.total / PRODUCTS_PAGE_SIZE);
  const otherPages = await Promise.all(
    Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) =>
      getProducts({ page: index + 2 })
    )
  );
  const products = [firstPage, ...otherPages].flatMap((page) => page.products);
  const staticEntries: MetadataRoute.Sitemap = publicPaths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: path === "/" || path === "/shop" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.6
  }));
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: new URL(`/shop/${encodeURIComponent(product.slug)}`, siteUrl).toString(),
    changeFrequency: "weekly",
    priority: 0.7
  }));

  return [...staticEntries, ...productEntries];
}
