const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const products = [
  {
    slug: "iphone-14-pro-256",
    name: "iPhone 14 Pro 256GB",
    brand: "Apple",
    description: "Factory unlocked, Face ID, 90% battery health, 3-month warranty.",
    specs: ["A16 Bionic", "256GB", '6.1" OLED', "48MP camera"],
    condition: "Refurbished",
    priceKobo: 72000000,
    images: ["https://images.unsplash.com/photo-1677041348948-7164ae4d2626"],
    tags: ["iphone", "flagship"],
    inStock: true
  },
  {
    slug: "samsung-s23-128",
    name: "Samsung Galaxy S23 128GB",
    brand: "Samsung",
    description: "Unlocked dual SIM, pristine AMOLED display.",
    specs: ["Snapdragon 8 Gen 2", "128GB", '6.1" AMOLED', "50MP camera"],
    condition: "New",
    priceKobo: 56000000,
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf"],
    tags: ["android", "flagship"],
    inStock: true
  },
  {
    slug: "pixel-8-128",
    name: "Google Pixel 8 128GB",
    brand: "Google",
    description: "Clean Android with AI tools, unlocked.",
    specs: ["Tensor G3", "128GB", '6.2" OLED', "50MP camera"],
    condition: "New",
    priceKobo: 45000000,
    images: ["https://images.unsplash.com/photo-1610945265009-9f8d1e4d1c57"],
    tags: ["android"],
    inStock: true
  },
  {
    slug: "iphone-13-128",
    name: "iPhone 13 128GB",
    brand: "Apple",
    description: "Great condition, unlocked, 87% battery health.",
    specs: ["A15 Bionic", "128GB", '6.1" OLED', "Dual camera"],
    condition: "Refurbished",
    priceKobo: 39000000,
    images: ["https://images.unsplash.com/photo-1603899123010-1c3a35ff4bcd"],
    tags: ["iphone"],
    inStock: true
  },
  {
    slug: "airpods-pro-2",
    name: "AirPods Pro (2nd Gen)",
    brand: "Apple",
    description: "ANC earbuds with MagSafe case, new.",
    specs: ["ANC", "Spatial Audio", "USB-C case"],
    condition: "New",
    priceKobo: 17000000,
    images: ["https://images.unsplash.com/photo-1588423771073-b8903fbb85b5"],
    tags: ["accessory"],
    inStock: true
  },
  {
    slug: "anker-737-powerbank",
    name: "Anker 737 Power Bank",
    brand: "Anker",
    description: "High-capacity 140W USB-C power bank.",
    specs: ["24,000mAh", "140W PD", "USB-C x2, USB-A"],
    condition: "New",
    priceKobo: 9500000,
    images: ["https://images.unsplash.com/photo-1509395176047-4a66953fd231"],
    tags: ["accessory", "power"],
    inStock: true
  },
  {
    slug: "iphone-12-64",
    name: "iPhone 12 64GB",
    brand: "Apple",
    description: "Good condition, light scratches, fully unlocked.",
    specs: ["A14 Bionic", "64GB", '6.1" OLED'],
    condition: "Used",
    priceKobo: 28500000,
    images: ["https://images.unsplash.com/photo-1580915411985-4d1ba4e2ee16"],
    tags: ["iphone", "budget"],
    inStock: true
  },
  {
    slug: "tecno-camon-20",
    name: "Tecno Camon 20",
    brand: "Tecno",
    description: "Affordable camera-first device, dual SIM.",
    specs: ["8GB RAM", "256GB", '6.67" AMOLED'],
    condition: "New",
    priceKobo: 14500000,
    images: ["https://images.unsplash.com/photo-1604881988758-f76ad2f7c751"],
    tags: ["android", "budget"],
    inStock: true
  }
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product
    });
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
