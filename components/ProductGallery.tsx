"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="min-w-0 space-y-3">
      <div className="overflow-hidden rounded-lg border border-gray-800">
        <Image
          src={active}
          alt="Product image"
          width={800}
          height={600}
          className="h-80 w-full object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((img) => (
          <button
            key={img}
            type="button"
            className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border ${
              active === img ? "border-brand-red" : "border-gray-700"
            }`}
            onClick={() => setActive(img)}
            aria-label={`Show product image ${images.indexOf(img) + 1}`}
            aria-pressed={active === img}
          >
            <Image src={img} alt="" width={80} height={80} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
