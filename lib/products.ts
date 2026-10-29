import "server-only";

import type {
  ProductDTO,
  ProductListResponse,
  ProductResponse
} from "@/lib/api-contracts";

type ProductFilters = {
  search?: string;
  brand?: string;
  condition?: string;
  min?: string;
  max?: string;
  page?: number;
};

const PRODUCTS_CACHE_TTL_SECONDS = 60;

const configuredApiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";
const normalizedApiBase = configuredApiBase.replace(/\/+$/, "");
const apiBase = normalizedApiBase.endsWith("/api")
  ? normalizedApiBase
  : `${normalizedApiBase}/api`;

async function requestApi<T>(path: string, allowNotFound = false): Promise<T | null> {
  const response = await fetch(`${apiBase}${path}`, {
    next: { revalidate: PRODUCTS_CACHE_TTL_SECONDS },
    cache: "force-cache"
  });

  if (allowNotFound && response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Product API request failed with ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

export async function getProducts(filters: ProductFilters = {}): Promise<ProductListResponse> {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  }

  const query = searchParams.size ? `?${searchParams.toString()}` : "";
  const result = await requestApi<ProductListResponse>(`/products${query}`);

  if (!result || !Array.isArray(result.products) || typeof result.total !== "number") {
    throw new Error("Product API returned an invalid product list.");
  }

  return result;
}

export async function getProductBySlug(slug: string): Promise<ProductDTO | null> {
  const result = await requestApi<ProductResponse>(
    `/products/${encodeURIComponent(slug)}`,
    true
  );

  if (result === null) {
    return null;
  }

  if (!result.product) {
    throw new Error("Product API returned an invalid product response.");
  }

  return result.product;
}
