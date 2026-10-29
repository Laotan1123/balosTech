import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { formatNGN } from "@/lib/format";
import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductBySlug } from "@/lib/products";

export const revalidate = 0;

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found", robots: { index: false, follow: false } };
  }

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/shop/${encodeURIComponent(product.slug)}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.slice(0, 1)
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: product.brand,
    sku: product.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: (product.priceKobo / 100).toFixed(0),
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} />
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="badge">{product.condition}</span>
            <span className="text-xs uppercase text-gray-400">{product.brand}</span>
          </div>
          <h1 className="text-3xl font-bold text-white">{product.name}</h1>
          <p className="text-gray-300">{product.description}</p>
          <div className="text-2xl font-bold text-white">{formatNGN(product.priceKobo)}</div>
          <div className="flex flex-wrap gap-2 text-sm text-gray-300">
            {product.specs.map((spec) => (
              <span key={spec} className="rounded-full bg-gray-800 px-3 py-1">
                {spec}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <AddToCartButton product={product} />
            <Link href={`/swap?product=${product.slug}`} className="btn-secondary">
              Start a swap
            </Link>
          </div>
          <div className="rounded-lg border border-gray-800 bg-brand-charcoal px-4 py-3 text-sm text-gray-300">
            <p>Pickup in Lagos or nationwide courier. Pay with Paystack/Flutterwave.</p>
          </div>
        </div>
      </div>
    </>
  );
}
